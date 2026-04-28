/**
 * Utility functions for processing financial data from GAS
 */

export interface Transaction {
  id: string;
  tanggal: string;
  nama_klien: string;
  asal_instansi: string;
  produk_layanan: string;
  nominal: number;
  catatan: string;
  metode_pembayaran: string;
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
    const fullDate = `${fullName}, ${d.getDate()} ${INDONESIAN_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    
    // Construct local YYYY-MM-DD string manually to avoid timezone shifts
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;
    
    // Filter transactions for this specific day
    const dayTransactions = transactions.filter((t) => {
      if (!t.tanggal) return false;
      
      // If t.tanggal is already YYYY-MM-DD string, compare directly
      // If it has time, clean it first
      let tDate = t.tanggal;
      if (tDate.includes(" ")) tDate = tDate.split(" ")[0];
      if (tDate.includes("T")) tDate = tDate.split("T")[0];
      
      return tDate === dateStr;
    });
    
    const income = dayTransactions
      .filter((t) => t.jenis_transaksi === "Pemasukan")
      .reduce((sum, t) => sum + (Number(t.nominal) || 0), 0);
      
    const expense = dayTransactions
      .filter((t) => t.jenis_transaksi === "Pengeluaran")
      .reduce((sum, t) => sum + (Number(t.nominal) || 0), 0);
      
    result.push({
      day: dayName,
      fullName: fullName,
      fullDate: fullDate,
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

/**
 * Stable Indonesian month names to avoid hydration mismatches
 */
export const INDONESIAN_MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const getCurrentMonthName = () => {
  const date = new Date();
  return INDONESIAN_MONTHS[date.getMonth()];
};

/**
 * Calculates service popularity statistics
 */
export const calculateServiceStats = (transactions: Transaction[]) => {
  const serviceCounts: Record<string, number> = {};
  let totalIncomeTransactions = 0;

  transactions.forEach(t => {
    if (t.jenis_transaksi === "Pemasukan" && t.produk_layanan && t.produk_layanan !== "-") {
      const service = t.produk_layanan;
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
      totalIncomeTransactions++;
    }
  });

  const stats = Object.keys(serviceCounts).map(name => ({
    name,
    count: serviceCounts[name],
    percentage: totalIncomeTransactions > 0 ? (serviceCounts[name] / totalIncomeTransactions) * 100 : 0
  })).sort((a, b) => b.count - a.count); // Sort by highest count

  return stats;
};
