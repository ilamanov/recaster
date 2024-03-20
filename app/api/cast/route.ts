import { NextResponse, type NextRequest } from "next/server";

import { getCast } from "@/lib/neynar";

export async function POST(req: NextRequest) {
  const json = await req.json();

  try {
    const cast = await getCast(json.castHash, json.fid);
    return NextResponse.json({ cast });
  } catch (error: any) {
    console.error("Error in cast/ endpoint", error);
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
