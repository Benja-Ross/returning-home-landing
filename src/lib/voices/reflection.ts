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
