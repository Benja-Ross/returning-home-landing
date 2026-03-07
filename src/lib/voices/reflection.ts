/**
 * Returns the reflection content to display: trimmed DB value if present, otherwise fallback.
 */
export function getReflectionContent(
  value: string | null | undefined,
  fallback: string
): string {
  const trimmed = value?.trim();
  if (trimmed && trimmed.length > 0) {
    return trimmed;
  }
  return fallback;
}

export const REFLECTION_FALLBACKS = {
  patternsEmerging:
    "The stewardship team has not yet reviewed this week's story submissions to identify the patterns beginning to emerge.",
  voicesFromStories:
    "The stewardship team has not yet selected story submission excerpts to highlight voices that feel especially revealing, resonant, or representative.",
  voiceOfPlace:
    "The stewardship team has not yet reflected on this week's story submissions to listen for what this place may be expressing through them.",
  emergingStory:
    "The stewardship team has not yet reflected on how this week's story submissions may connect into a larger unfolding narrative.",
} as const;

/** Default summary text per week when no custom summary exists in the database. */
export const DEFAULT_WEEKLY_SUMMARIES: Record<number, string> = {
  1: "The journey begins by slowing and localizing our attention and noticing the overlooked details of everyday life.",
  2: "Attention shifts from observation to relationship as we share where we feel at home.",
  3: "Shared memories begin to surface, revealing how place has became what it is today.",
  4: "The focus moves to present obvservations as we sense what is changing or feels important now.",
  5: "Possibilities begin to appear as we imagine what could help place thrive.",
  6: "The cycle turns toward small steps we could take to care for place individually and together.",
};

/**
 * Returns the summary text for a week: custom DB value if present and non-empty, otherwise default for that week number.
 */
export function getWeeklySummaryText(
  weekNumber: number,
  customSummary: string | null | undefined
): string {
  const trimmed = customSummary?.trim();
  if (trimmed && trimmed.length > 0) {
    return trimmed;
  }
  return DEFAULT_WEEKLY_SUMMARIES[weekNumber] ?? "—";
}
