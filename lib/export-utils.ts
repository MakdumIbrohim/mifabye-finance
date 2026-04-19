import { Transaction, formatCurrency } from "./finance-utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

/**
 * Utility for exporting transaction data in various formats
 */

const getReportTitle = (filterInfo: string) => {
  return `Laporan Keuangan Mifabyte - ${filterInfo || "Semua Data"}`;
};

const getFileName = (filterInfo: string, extension: string) => {
  const date = new Date().toISOString().split("T")[0];
  const info = filterInfo ? `_${filterInfo.replace(/\s+/g, "_")}` : "";
  return `Mifabyte_Finance_${date}${info}.${extension}`;
};

/**
 * Export to CSV
 */
export const exportToCSV = (data: Transaction[], filterInfo: string) => {
  const headers = ["ID", "Tanggal", "Pihak/Klien", "Instansi", "Layanan", "Nominal", "Tipe", "Metode", "Catatan"];
  const rows = data.map(t => [
    t.id,
    t.tanggal,
    t.nama_klien,
    t.asal_instansi,
    t.produk_layanan,
    t.nominal,
    t.jenis_transaksi,
    t.metode_pembayaran,
    t.catatan
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", getFileName(filterInfo, "csv"));
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export to Excel
 */
export const exportToExcel = (data: Transaction[], filterInfo: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data.map(t => ({
    "ID Transaksi": t.id,
    "Tanggal": t.tanggal,
    "Nama Klien": t.nama_klien,
    "Asal Instansi": t.asal_instansi,
    "Produk/Layanan": t.produk_layanan,
    "Nominal": t.nominal,
    "Jenis Transaksi": t.jenis_transaksi,
    "Metode Pembayaran": t.metode_pembayaran,
    "Catatan": t.catatan,
    "Dibuat Pada": t.created_at
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");
  
  XLSX.writeFile(workbook, getFileName(filterInfo, "xlsx"));
};

/**
 * Export to PDF
 */
export const exportToPDF = (data: Transaction[], filterInfo: string) => {
  const doc = new jsPDF("l", "mm", "a4");
  const title = getReportTitle(filterInfo);

  // Add Header
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text("Mifabyte Finance", 14, 15);
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(title, 14, 22);
  doc.text(`Dicetak pada: ${new Date().toLocaleString("id-ID")}`, 14, 27);

  // Table
  autoTable(doc, {
    startY: 35,
    head: [["ID", "Tanggal", "Klien/Instansi", "Layanan", "Nominal", "Tipe", "Metode"]],
    body: data.map(t => [
      t.id,
      t.tanggal,
      `${t.nama_klien}\n(${t.asal_instansi})`,
      t.produk_layanan,
      formatCurrency(t.nominal),
      t.jenis_transaksi,
      t.metode_pembayaran
    ]),
    theme: "striped",
    headStyles: { fillColor: [44, 73, 216], textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      4: { halign: "right" }
    }
  });

  doc.save(getFileName(filterInfo, "pdf"));
};
