import { NextResponse } from "next/server";
import type { VesselApiResponse } from "@/lib/ais/types";

export const revalidate = 60;

export async function GET() {
  const response: VesselApiResponse = {
    vessels: [],
    updatedAt: new Date().toISOString(),
    total: 0,
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  });
}
