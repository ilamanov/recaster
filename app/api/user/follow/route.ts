import { NextResponse, type NextRequest } from "next/server";

import { client } from "@/lib/neynar";

export async function POST(req: NextRequest) {
  const json = await req.json();

  try {
    const clientResponse = await client.followUser(json.signerUuid, [
      parseInt(json.fid),
    ]);
    return NextResponse.json(clientResponse);
  } catch (error: any) {
    console.error("Error in user/follow endpoint", error);
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
