import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction, formatCurrency, INDONESIAN_MONTHS } from "./finance-utils";

export const TEAM_MEMBERS = [
  "Fitri Aulia",
  "Makdum Ibrohim",
  "Muslimah Kurniawati",
  "Tamara Adjuah",
  "Nabil Qistubillah"
];

export const exportPremiumPDF = async (transactions: Transaction[], month: number, year: number) => {
  const doc = new jsPDF();
  const monthName = INDONESIAN_MONTHS[month];
  
  // Load Logo
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  try {
    const logo = await loadImage("/assets/mifabyte.png");
    doc.addImage(logo, 'PNG', 15, 10, 10, 10); // X, Y, W, H
  } catch (e) {
    console.error("Failed to load logo:", e);
  }

  // 1. Header Design
  // Blue side accent
  doc.setFillColor(37, 99, 235); // Primary Blue
  doc.rect(0, 0, 10, 40, 'F');
  
  // Title & Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("MIFABYTE", 28, 18);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("LAPORAN KEUANGAN BULANAN", 15, 27);
  
  // Period Info
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`${monthName.toUpperCase()} ${year}`, 155, 20, { align: "right" });
  
  // Line under header
  doc.setDrawColor(230);
  doc.line(15, 35, 195, 35);
  
  // 2. Summary Section
  const income = transactions
    .filter(t => t.jenis_transaksi === "Pemasukan")
    .reduce((sum, t) => sum + (Number(t.nominal) || 0), 0);
  const expense = transactions
    .filter(t => t.jenis_transaksi === "Pengeluaran")
    .reduce((sum, t) => sum + (Number(t.nominal) || 0), 0);
  const balance = income - expense;

  // Background for summary
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 45, 180, 25, 3, 3, 'F');
  
  // Income
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("TOTAL PEMASUKAN", 25, 53);
  doc.setFontSize(12);
  doc.setTextColor(37, 99, 235);
  doc.text(formatCurrency(income), 25, 62);
  
  // Expense
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("TOTAL PENGELUARAN", 85, 53);
  doc.setFontSize(12);
  doc.setTextColor(239, 68, 68);
  doc.text(formatCurrency(expense), 85, 62);
  
  // Balance
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("SALDO AKHIR", 145, 53);
  doc.setFontSize(12);
  doc.setTextColor(37, 99, 235);
  doc.text(formatCurrency(balance), 145, 62);
  
  // 3. Transactions Table
  const tableData = transactions.map((t, index) => [
    index + 1,
    new Date(t.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' }),
    t.nama_klien || "-",
    t.produk_layanan || "-",
    t.jenis_transaksi,
    formatCurrency(t.nominal)
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['NO', 'TANGGAL', 'KLIEN', 'LAYANAN', 'TIPE', 'NOMINAL']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [50, 50, 50]
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'center', cellWidth: 25 },
      4: { halign: 'center', cellWidth: 25 },
      5: { halign: 'right', cellWidth: 35 }
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    },
    margin: { left: 15, right: 15 }
  });

  // 4. Footer & Signature
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  
  if (finalY < 250) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Tim Mifabyte:", 15, finalY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100);
    
    // List team members in columns
    const mid = Math.ceil(TEAM_MEMBERS.length / 2);
    TEAM_MEMBERS.slice(0, mid).forEach((name, i) => {
      doc.text(`- ${name}`, 15, finalY + 8 + (i * 6));
    });
    TEAM_MEMBERS.slice(mid).forEach((name, i) => {
      doc.text(`- ${name}`, 70, finalY + 8 + (i * 6));
    });
    
    // Signature area
    doc.setFont("helvetica", "bold");
    doc.text("Disetujui Oleh,", 155, finalY, { align: "center" });
    doc.setDrawColor(200);
    doc.line(135, finalY + 25, 175, finalY + 25);
    doc.setFontSize(7);
    doc.text("Admin Keuangan Mifabyte", 155, finalY + 29, { align: "center" });
  }

  // 5. Save the PDF
  doc.save(`Laporan_Mifabyte_${monthName}_${year}.pdf`);
};
