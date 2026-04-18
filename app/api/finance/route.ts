import { NextResponse } from "next/server";

const gasUrl = process.env.GAS_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || "insert";
    
    if (!gasUrl) {
      return NextResponse.json(
        { result: "error", message: "GAS_URL is not configured" },
        { status: 500 }
      );
    }

    let gasPayload: any = { action };

    // Common fields for insert and update
    if (action === "insert" || action === "update") {
      gasPayload = {
        ...gasPayload,
        id: body.id, // Only for update, insert will be ignored or handled by GAS
        tanggal: body.tanggal,
        nama_klien: body.namaKlien || "-",
        asal_instansi: body.instansi || "-",
        jenis_layanan: body.layanan || "-",
        nominal: Number(body.jumlah?.toString().replace(/[^0-9]/g, "")) || 0,
        catatan: body.catatan || "",
        jenis_transaksi: body.transactionType === "in" || body.jenis_transaksi === "Pemasukan" || body.jenis_transaksi === "Uang Masuk" ? "Pemasukan" : "Pengeluaran"
      };
    }

    // Special handling for delete
    if (action === "delete") {
      gasPayload.id = body.id;
    }

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(gasPayload),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GAS Proxy POST Error:", error);
    return NextResponse.json(
      { result: "error", message: "Gagal memproses ke Google Script" },
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
      cache: "no-store",
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GAS Proxy GET Error:", error);
    return NextResponse.json(
      { result: "error", message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
