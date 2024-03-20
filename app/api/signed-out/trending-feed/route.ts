import { NextResponse } from "next/server";
import { FilterType } from "@neynar/nodejs-sdk";

import { getFeed } from "@/lib/neynar";

export async function GET() {
  try {
    const feed = await getFeed(FilterType.GlobalTrending, []);
    return NextResponse.json({ feed });
  } catch (error: any) {
    console.error("Error in signed-out/trending-feed endpoint", error);
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
