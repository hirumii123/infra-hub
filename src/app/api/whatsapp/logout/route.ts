import { logoutWhatsApp } from "@/lib/whatsapp";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logoutWhatsApp();
    return NextResponse.json({ status: "success", message: "Sesi dihapus" });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}