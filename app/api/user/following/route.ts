import { NextResponse, type NextRequest } from "next/server";

import { fetchAllFollowing } from "@/lib/neynar";

export async function POST(req: NextRequest) {
  const json = await req.json();

  try {
    const users = await fetchAllFollowing(parseInt(json.fid));
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error in user/following endpoint", error);
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
