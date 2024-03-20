import { NextResponse, type NextRequest } from "next/server";

import { getFollowingFeed } from "@/lib/neynar";

export async function POST(req: NextRequest) {
  const json = await req.json();

  try {
    const feed = await getFollowingFeed(parseInt(json.fid));
    return NextResponse.json({ feed });
  } catch (error: any) {
    console.error("Error in user/feed endpoint", error);
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
