/**
 * Utility functions for processing financial data from GAS
 */

export interface Transaction {
  id: string;
  tanggal: string;
  nama_klien: string;
  asal_instansi: string;
  jenis_layanan: string;
  nominal: number;
  catatan: string;
  jenis_transaksi: string;
  created_at: string;
}

/**
 * Formats a number to Indonesian Rupiah currency string
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generates chart data for the last 7 days from transaction list
 */
export const calculateChartData = (transactions: Transaction[]) => {
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const fullDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  
  const result = [];
  
  // Create last 7 days list
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0); // Normalize time
    
    const dayName = days[d.getDay()];
    const fullName = fullDays[d.getDay()];
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    
    // Filter transactions for this specific day
    const dayTransactions = transactions.filter((t) => {
      const tDate = new Date(t.tanggal).toISOString().split("T")[0];
      return tDate === dateStr;
    });
    
    const income = dayTransactions
      .filter((t) => t.jenis_transaksi === "Uang Masuk")
      .reduce((sum, t) => sum + t.nominal, 0);
      
    const expense = dayTransactions
      .filter((t) => t.jenis_transaksi === "Uang Keluar")
      .reduce((sum, t) => sum + t.nominal, 0);
      
    result.push({
      day: dayName,
      fullName: fullName,
      income: income / 1000, // Scale down for graph if needed, or keep raw for tooltips
      rawIncome: income,
      rawExpense: expense,
      expense: expense / 1000,
    });
  }
  
  // Normalize values to 0-100 scale for SVG viewbox
  const allValues = result.flatMap(r => [r.income, r.expense]);
  const maxVal = Math.max(...allValues, 10); // Minimum 10 to avoid flat graph
  
  return result.map(r => ({
    ...r,
    income: (r.income / maxVal) * 100,
    expense: (r.expense / maxVal) * 100
  }));
};
