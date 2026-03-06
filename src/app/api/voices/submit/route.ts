import { NextResponse } from "next/server";

import { getSubmissionContextForRegionCycleWeek } from "@/lib/voices/data";
import { getRegion } from "@/lib/voices/regions";
import { submissionSchema } from "@/lib/voices/validation";
import { supabaseAdmin } from "@/lib/supabase/server";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Please wait a bit and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const message = Object.values(first).flat().join(" ") || "Validation failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website != null && String(data.website).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!getRegion(data.regionSlug)) {
    return NextResponse.json(
      { ok: false, error: "Invalid region." },
      { status: 400 }
    );
  }

  const context = await getSubmissionContextForRegionCycleWeek(data.regionCycleWeekId);
  if (!context) {
    return NextResponse.json(
      { ok: false, error: "Invalid or inactive week." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("submissions").insert({
    region_id: context.regionId,
    region_cycle_id: context.regionCycleId,
    region_cycle_week_id: data.regionCycleWeekId,
    name: data.name,
    neighborhood: data.neighborhood,
    response: data.response,
    consent_public: data.consentPublic ?? true,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
