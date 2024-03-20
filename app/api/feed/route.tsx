import { NextResponse, type NextRequest } from "next/server";

import { getFeed } from "@/lib/neynar";

export async function POST(req: NextRequest) {
  const json = await req.json();

  try {
    const feed = await getFeed(
      json.filterType,
      json.forFids ? json.forFids.map((fid: string) => parseInt(fid)) : [],
      parseInt(json.fid)
    );
    return NextResponse.json({ feed });
  } catch (error: any) {
    console.error("Error in feed/ endpoint", error);
    return NextResponse.json(
      {
        error: error.toString(),
      },
      {
        status: 500,
      }
    );
  }
}
