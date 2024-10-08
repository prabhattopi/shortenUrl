import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const urls = await prisma.url.findMany({
            orderBy: { createdAt: "desc" },
            take: 5
        })
        return NextResponse.json(urls)


    }
    catch (err) {
        console.error("Error fetching URLS", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })

    }
}