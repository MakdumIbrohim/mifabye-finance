import { NextResponse } from "next/server";

const gasUrl = process.env.GAS_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!gasUrl) {
      return NextResponse.json(
        { result: "error", message: "GAS_URL is not configured in .env.local" },
        { status: 500 }
      );
    }

    // Map local frontend fields to user's GAS script fields
    const gasPayload = {
      action: "insert",
      tanggal: body.tanggal,
      nama_klien: body.namaKlien || "-",
      asal_instansi: body.instansi || "-",
      jenis_layanan: body.layanan || "-",
      nominal: Number(body.jumlah.toString().replace(/[^0-9]/g, "")) || 0,
      catatan: body.catatan || "",
      jenis_transaksi: body.transactionType === "in" ? "Uang Masuk" : "Uang Keluar"
    };

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(gasPayload),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GAS POST Proxy Error:", error);
    return NextResponse.json(
      { result: "error", message: "Gagal menghubungkan ke Google Script" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!gasUrl) {
      return NextResponse.json(
        { result: "error", message: "GAS_URL is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(gasUrl, {
      method: "GET",
      cache: "no-store", // Ensure real-time data
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GAS GET Proxy Error:", error);
    return NextResponse.json(
      { result: "error", message: "Gagal mengambil data dari Google Script" },
      { status: 500 }
    );
  }
}
