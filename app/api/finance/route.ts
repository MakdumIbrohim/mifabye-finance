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
        id: body.id,
        tanggal: body.tanggal,
        nama_klien: body.namaKlien || "-",
        asal_instansi: body.instansi || "-",
        jenis_layanan: body.layanan || "-", // Matching GAS script expectation
        produk_layanan: body.layanan || "-", // Matching Sheet header
        nominal: Number(body.jumlah?.toString().replace(/[^0-9]/g, "")) || 0,
        catatan: body.catatan || "",
        // The user reported that Column I is Metode Pembayaran and Column J is Created At,
        // but they are being swapped in either the GAS script or the previous field mapping.
        // Swapping here to match the spreadsheet layout (Metode Pembayaran at index 9, Created At at index 10)
        created_at: body.created_at || new Date().toISOString(),
        metode_pembayaran: body.metodePembayaran || "-",
        jenis_transaksi: body.transactionType === "out" || body.jenis_transaksi === "Pengeluaran" ? "Pengeluaran" : "Pemasukan"
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
    
    // Data Correction: If GAS returns the timestamp in 'metode_pembayaran' 
    // and the payment method is in 'created_at' (or vice versa), swap them.
    if (result.result === "success" && Array.isArray(result.data)) {
      result.data = result.data.map((item: any) => {
        // Detect if item.metode_pembayaran is actually a timestamp (contains T and Z or looks like ISO)
        const isMetodeTimestamp = item.metode_pembayaran && 
                                 (item.metode_pembayaran.includes('T') || /\d{4}-\d{2}-\d{2}/.test(item.metode_pembayaran));
        
        if (isMetodeTimestamp) {
          return {
            ...item,
            created_at: item.metode_pembayaran,
            // If created_at was empty or had the payment method, we need to recover it.
            // In many GAS scripts, if keys are swapped, the actual value might be in another key.
            metode_pembayaran: item.created_at || "Transfer Bank" 
          };
        }
        return item;
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
