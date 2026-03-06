export type SubmissionCardDTO = {
  id: string;
  name: string | null;
  neighborhood: string;
  response: string;
  created_at: string;
  /** Week context for region-wide feed (e.g. "Week 1", "Noticing Place"). */
  weekLabel?: string | null;
  themeTitle?: string | null;
};

/** One week in the six-week arc for a region (from cycle_weeks + region_cycle_weeks). */
export type RegionCycleWeekSummaryDTO = {
  regionCycleWeekId: string;
  weekNumber: number;
  weekLabel: string;
  themeTitle: string;
  summaryShort: string | null;
  status: "upcoming" | "active" | "completed";
};

/** Active week for a region: synthesis + question for the "What Voices of Place Are Saying" block. */
export type ActiveRegionWeekDTO = {
  regionCycleWeekId: string;
  weekLabel: string;
  themeTitle: string;
  question: string;
  participationSummary: string | null;
  patternsEmerging: string | null;
  voicesFromStories: string[];
  voiceOfPlace: string | null;
  emergingStory: string | null;
  summaryShort: string | null;
};

export type FeedPage = {
  items: SubmissionCardDTO[];
  totalApproved: number;
  nextCursor?: string;
};

const CURSOR_SEP = "__";

export function encodeCursor(createdAt: string, id: string): string {
  return encodeURIComponent(`${createdAt}${CURSOR_SEP}${id}`);
}

export function decodeCursor(cursor: string): { createdAt: string; id: string } | null {
  try {
    const decoded = decodeURIComponent(cursor);
    const idx = decoded.lastIndexOf(CURSOR_SEP);
    if (idx === -1) return null;
    const createdAt = decoded.slice(0, idx);
    const id = decoded.slice(idx + CURSOR_SEP.length);
    if (!createdAt || !id) return null;
    return { createdAt, id };
  } catch {
    return null;
  }
}
