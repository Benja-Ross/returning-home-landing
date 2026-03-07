import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";
import type {
  ActiveRegionWeekDTO,
  FeedPage,
  RegionCycleWeekSummaryDTO,
  SubmissionCardDTO,
} from "@/lib/voices/feed";
import { decodeCursor, encodeCursor } from "@/lib/voices/feed";

// ----- New schema: active region week -----

function parseVoicesFromStories(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Fetches the active region_cycle_week for a region (status = 'active').
 * Returns null if the region has no active week.
 */
export async function getActiveRegionWeek(
  regionSlug: string
): Promise<ActiveRegionWeekDTO | null> {
  const { data: region, error: regionError } = await supabaseAdmin
    .from("regions")
    .select("id")
    .eq("slug", regionSlug)
    .limit(1)
    .maybeSingle();

  if (regionError || !region) {
    return null;
  }

  const { data: rc, error: rcError } = await supabaseAdmin
    .from("region_cycles")
    .select("id")
    .eq("region_id", region.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (rcError || !rc) {
    return null;
  }

  const { data: rcwRow, error: rcwRowError } = await supabaseAdmin
    .from("region_cycle_weeks")
    .select(
      `
      id,
      theme_title_override,
      question_override,
      participation_summary,
      patterns_emerging,
      voices_from_stories,
      voice_of_place,
      emerging_story,
      summary_short,
      cycle_weeks (
        week_number,
        week_label,
        theme_title,
        question
      )
    `
    )
    .eq("region_cycle_id", rc.id)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (rcwRowError || !rcwRow) {
    return null;
  }

  const raw = rcwRow.cycle_weeks as
    | { week_number: number; week_label: string; theme_title: string; question: string }
    | { week_number: number; week_label: string; theme_title: string; question: string }[]
    | null;
  const cw = Array.isArray(raw) ? raw[0] ?? null : raw;
  if (!cw) {
    return null;
  }

  const { data: submissionRows } = await supabaseAdmin
    .from("submissions")
    .select("neighborhood")
    .eq("region_cycle_week_id", rcwRow.id)
    .eq("moderation_status", "approved")
    .eq("consent_public", true);

  const neighborhoods = (submissionRows ?? []) as { neighborhood: string | null }[];
  const totalResponses = neighborhoods.length;
  const distinctAreas = new Set(
    neighborhoods
      .map((s) => (s.neighborhood ?? "").trim().toLowerCase())
      .filter((s) => s.length > 0)
  ).size;

  return {
    regionCycleWeekId: rcwRow.id,
    weekLabel: cw.week_label ?? `Week ${cw.week_number}`,
    themeTitle: rcwRow.theme_title_override ?? cw.theme_title ?? "",
    question: rcwRow.question_override ?? cw.question ?? "",
    participationSummary: rcwRow.participation_summary ?? null,
    totalResponses,
    distinctAreas,
    patternsEmerging: rcwRow.patterns_emerging ?? null,
    voicesFromStories: parseVoicesFromStories(rcwRow.voices_from_stories),
    voiceOfPlace: rcwRow.voice_of_place ?? null,
    emergingStory: rcwRow.emerging_story ?? null,
    summaryShort: rcwRow.summary_short ?? null,
  };
}

/**
 * Fetches all six weeks for the region's current cycle, ordered by week_number.
 */
export async function getRegionCycleWeeks(
  regionSlug: string
): Promise<RegionCycleWeekSummaryDTO[]> {
  const { data: region, error: regionError } = await supabaseAdmin
    .from("regions")
    .select("id")
    .eq("slug", regionSlug)
    .limit(1)
    .maybeSingle();

  if (regionError || !region) {
    return [];
  }

  const { data: rc, error: rcError } = await supabaseAdmin
    .from("region_cycles")
    .select("id")
    .eq("region_id", region.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (rcError || !rc) {
    return [];
  }

  const { data: rows, error } = await supabaseAdmin
    .from("region_cycle_weeks")
    .select(
      `
      id,
      status,
      theme_title_override,
      summary_short,
      cycle_weeks (
        week_number,
        week_label,
        theme_title
      )
    `
    )
    .eq("region_cycle_id", rc.id);

  if (error || !rows?.length) {
    return [];
  }

  const sorted = [...rows].sort((a, b) => {
    const acw = a.cycle_weeks as { week_number?: number } | { week_number?: number }[] | null;
    const bcw = b.cycle_weeks as { week_number?: number } | { week_number?: number }[] | null;
    const an = Array.isArray(acw) ? acw[0]?.week_number : acw?.week_number;
    const bn = Array.isArray(bcw) ? bcw[0]?.week_number : bcw?.week_number;
    return (an ?? 0) - (bn ?? 0);
  });

  const result: RegionCycleWeekSummaryDTO[] = [];
  for (const row of sorted) {
    const raw = row.cycle_weeks as
      | { week_number: number; week_label: string; theme_title: string }
      | { week_number: number; week_label: string; theme_title: string }[]
      | null;
    const cw = Array.isArray(raw) ? raw[0] ?? null : raw;
    if (!cw) continue;
    const status = (row.status as string) === "active" ? "active" : (row.status as string) === "completed" ? "completed" : "upcoming";
    result.push({
      regionCycleWeekId: row.id,
      weekNumber: cw.week_number,
      weekLabel: cw.week_label ?? `Week ${cw.week_number}`,
      themeTitle: row.theme_title_override ?? cw.theme_title ?? "",
      summaryShort: row.summary_short ?? null,
      status,
    });
  }
  return result;
}

const DEFAULT_FEED_LIMIT = 12;

/**
 * Returns region_id and region_cycle_id for a given region_cycle_week_id (for submission inserts).
 * Returns null if the week is not found.
 */
export async function getSubmissionContextForRegionCycleWeek(
  regionCycleWeekId: string
): Promise<{ regionId: string; regionCycleId: string } | null> {
  const { data: rcw, error: rcwError } = await supabaseAdmin
    .from("region_cycle_weeks")
    .select("region_cycle_id")
    .eq("id", regionCycleWeekId)
    .limit(1)
    .maybeSingle();

  if (rcwError || !rcw?.region_cycle_id) {
    return null;
  }

  const { data: rc, error: rcError } = await supabaseAdmin
    .from("region_cycles")
    .select("region_id")
    .eq("id", rcw.region_cycle_id)
    .limit(1)
    .maybeSingle();

  if (rcError || !rc?.region_id) {
    return null;
  }

  return { regionId: rc.region_id, regionCycleId: rcw.region_cycle_id };
}

/**
 * Paginated submissions for the whole region (moderation_status = 'approved', consent_public = true).
 * Includes week context (weekLabel, themeTitle) via region_cycle_weeks -> cycle_weeks.
 */
export async function getApprovedSubmissionsPageForRegion(params: {
  regionSlug: string;
  limit?: number;
  cursor?: string;
}): Promise<FeedPage> {
  const limit = params.limit ?? DEFAULT_FEED_LIMIT;

  const { data: region, error: regionError } = await supabaseAdmin
    .from("regions")
    .select("id")
    .eq("slug", params.regionSlug)
    .limit(1)
    .maybeSingle();

  if (regionError || !region) {
    return { items: [], totalApproved: 0 };
  }

  const { count: totalApproved, error: countError } = await supabaseAdmin
    .from("submissions")
    .select("*", { count: "exact", head: true })
    .eq("region_id", region.id)
    .eq("moderation_status", "approved")
    .eq("consent_public", true);

  if (countError) {
    throw new Error(`Failed to count submissions: ${countError.message}`);
  }

  let itemsQuery = supabaseAdmin
    .from("submissions")
    .select(
      "id,name,neighborhood,response,created_at,region_cycle_weeks(cycle_weeks(week_label,theme_title))"
    )
    .eq("region_id", region.id)
    .eq("moderation_status", "approved")
    .eq("consent_public", true)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(limit);

  const decoded = params.cursor ? decodeCursor(params.cursor) : null;
  if (decoded) {
    itemsQuery = itemsQuery.lt("created_at", decoded.createdAt);
  }

  const { data: rows, error: itemsError } = await itemsQuery;

  if (itemsError) {
    throw new Error(`Failed to fetch submissions: ${itemsError.message}`);
  }

  const typedRows = (rows ?? []) as Array<{
    id: string;
    name: string | null;
    neighborhood: string;
    response: string;
    created_at: string;
    region_cycle_weeks?: {
      cycle_weeks?: { week_label?: string; theme_title?: string } | null;
    } | null;
  }>;

  const items: SubmissionCardDTO[] = typedRows.map((row) => {
    const rcw = row.region_cycle_weeks;
    const cw = rcw && !Array.isArray(rcw) ? rcw.cycle_weeks : null;
    const cwObj = cw && !Array.isArray(cw) ? cw : Array.isArray(cw) ? cw[0] : null;
    return {
      id: row.id,
      name: row.name,
      neighborhood: row.neighborhood,
      response: row.response,
      created_at: row.created_at,
      weekLabel: cwObj?.week_label ?? null,
      themeTitle: cwObj?.theme_title ?? null,
    };
  });

  let nextCursor: string | undefined;
  if (items.length === limit && items.length > 0) {
    const last = items[items.length - 1];
    nextCursor = encodeCursor(last.created_at, last.id);
  }

  return {
    items,
    totalApproved: totalApproved ?? 0,
    nextCursor,
  };
}

/**
 * Paginated submissions for a single region_cycle_week (moderation_status = 'approved', consent_public = true).
 */
export async function getApprovedSubmissionsPageForRegionWeek(params: {
  regionCycleWeekId: string;
  limit?: number;
  cursor?: string;
}): Promise<FeedPage> {
  const limit = params.limit ?? DEFAULT_FEED_LIMIT;

  const { count: totalApproved, error: countError } = await supabaseAdmin
    .from("submissions")
    .select("*", { count: "exact", head: true })
    .eq("region_cycle_week_id", params.regionCycleWeekId)
    .eq("moderation_status", "approved")
    .eq("consent_public", true);

  if (countError) {
    throw new Error(`Failed to count submissions: ${countError.message}`);
  }

  let itemsQuery = supabaseAdmin
    .from("submissions")
    .select("id,name,neighborhood,response,created_at")
    .eq("region_cycle_week_id", params.regionCycleWeekId)
    .eq("moderation_status", "approved")
    .eq("consent_public", true)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(limit);

  const decoded = params.cursor ? decodeCursor(params.cursor) : null;
  if (decoded) {
    itemsQuery = itemsQuery.lt("created_at", decoded.createdAt);
  }

  const { data: items, error: itemsError } = await itemsQuery;

  if (itemsError) {
    throw new Error(`Failed to fetch submissions: ${itemsError.message}`);
  }

  const typedItems = (items ?? []) as SubmissionCardDTO[];
  let nextCursor: string | undefined;
  if (typedItems.length === limit && typedItems.length > 0) {
    const last = typedItems[typedItems.length - 1];
    nextCursor = encodeCursor(last.created_at, last.id);
  }

  return {
    items: typedItems,
    totalApproved: totalApproved ?? 0,
    nextCursor,
  };
}
