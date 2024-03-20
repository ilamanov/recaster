import { NextResponse, type NextRequest } from "next/server";

import { client } from "@/lib/neynar";

export async function POST(req: NextRequest) {
  const json = await req.json();

  try {
    const clientResponse = await client.publishReactionToCast(
      json.signerUuid,
      json.reaction,
      json.castHash
    );
    return NextResponse.json(clientResponse);
  } catch (error: any) {
    console.error("Error in cast/react endpoint", error);
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
