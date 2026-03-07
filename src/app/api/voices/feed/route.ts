import { NextResponse } from "next/server";

import {
  decodeRegionFeedCursor,
  getApprovedSubmissionsPageForRegion,
} from "@/lib/voices/data";
import { getRegion } from "@/lib/voices/regions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionSlug = searchParams.get("regionSlug");
  const cursorParam = searchParams.get("cursor") ?? undefined;

  if (!regionSlug || typeof regionSlug !== "string" || regionSlug.trim() === "") {
    return NextResponse.json(
      { ok: false, error: "regionSlug is required." },
      { status: 400 }
    );
  }

  if (!getRegion(regionSlug.trim())) {
    return NextResponse.json(
      { ok: false, error: "Invalid region." },
      { status: 400 }
    );
  }

  if (cursorParam !== undefined && cursorParam !== null && cursorParam !== "") {
    const parsed = decodeRegionFeedCursor(cursorParam);
    if (!parsed) {
      return NextResponse.json(
        { ok: false, error: "Invalid cursor." },
        { status: 400 }
      );
    }
  }

  try {
    const feedPage = await getApprovedSubmissionsPageForRegion({
      regionSlug: regionSlug.trim(),
      limit: 12,
      cursor: cursorParam ?? undefined,
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
