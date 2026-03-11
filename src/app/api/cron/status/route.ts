import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cronActive: !!global.__email_cron,
    serverTime: new Date().toLocaleString("id-ID"),
  });
}