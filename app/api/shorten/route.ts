import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
// 
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    const shortCode = nanoid(8);

    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    return NextResponse.json({ shortCode: shortenedUrl.shortCode });
  } catch (error) {
    console.error('Error in URL shortening:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
