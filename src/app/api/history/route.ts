import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET () {
    try {
        const history = await prisma.emailQueue.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(history);
        
    }   catch (error) {
        return NextResponse.json({ error: 'gagal ambil data'}, {status: 500});
    }
}