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
      // Ensure date is only YYYY-MM-DD
      const cleanTanggal = body.tanggal?.toString().includes("T") 
        ? body.tanggal.split("T")[0] 
        : body.tanggal;

      gasPayload = {
        ...gasPayload,
        id: body.id,
        tanggal: cleanTanggal,
        nama_klien: body.namaKlien || "-",
        asal_instansi: body.instansi || "-",
        produk_layanan: body.layanan || "-", // Column E (index 4)
        nominal: Number(body.jumlah?.toString().replace(/[^0-9]/g, "")) || 0,
        catatan: body.catatan || "",
        jenis_transaksi: body.transactionType === "out" || body.jenis_transaksi === "Pengeluaran" ? "Pengeluaran" : "Pemasukan",
        metode_pembayaran: body.metodePembayaran || "-",
        created_at: body.created_at || new Date().toISOString(),
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
    
    // Data Normalization
    if (result.result === "success" && Array.isArray(result.data)) {
      result.data = result.data.map((item: any) => {
        // Ensure nominal is a clean number
        const rawNominal = item.nominal?.toString() || "0";
        const cleanNominal = Number(rawNominal.replace(/[^0-9.-]/g, "")) || 0;

        // Ensure tanggal is only YYYY-MM-DD
        let cleanTanggal = item.tanggal || "";
        if (cleanTanggal.includes(" ")) {
          cleanTanggal = cleanTanggal.split(" ")[0];
        } else if (cleanTanggal.includes("T")) {
          cleanTanggal = cleanTanggal.split("T")[0];
        }

        return {
          ...item,
          nominal: cleanNominal,
          tanggal: cleanTanggal
        };
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GAS Proxy GET Error:", error);
    return NextResponse.json(
      { result: "error", message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
