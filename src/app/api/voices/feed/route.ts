import { NextResponse } from "next/server";

import { getApprovedSubmissionsPageForRegionWeek } from "@/lib/voices/data";
import { getRegion } from "@/lib/voices/regions";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionSlug = searchParams.get("regionSlug");
  const regionCycleWeekId = searchParams.get("regionCycleWeekId");
  const cursor = searchParams.get("cursor") ?? undefined;

  if (!regionSlug || typeof regionSlug !== "string" || regionSlug.trim() === "") {
    return NextResponse.json(
      { ok: false, error: "regionSlug is required." },
      { status: 400 }
    );
  }

  if (!regionCycleWeekId || !UUID_REGEX.test(regionCycleWeekId)) {
    return NextResponse.json(
      { ok: false, error: "Valid regionCycleWeekId (UUID) is required." },
      { status: 400 }
    );
  }

  if (!getRegion(regionSlug.trim())) {
    return NextResponse.json(
      { ok: false, error: "Invalid region." },
      { status: 400 }
    );
  }

  try {
    const feedPage = await getApprovedSubmissionsPageForRegionWeek({
      regionCycleWeekId,
      limit: 12,
      cursor,
    });

    return NextResponse.json({
      ok: true,
      items: feedPage.items,
      totalApproved: feedPage.totalApproved,
      nextCursor: feedPage.nextCursor,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to load feed." },
      { status: 500 }
    );
  }
}
