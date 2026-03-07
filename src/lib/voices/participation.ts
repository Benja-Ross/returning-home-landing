/**
 * Returns the participation summary string for the current week reflection.
 * Uses customSummary when present and non-empty; otherwise generates fallback from counts.
 */
export function getParticipationSummary(
  customSummary: string | null,
  totalResponses: number,
  distinctAreas: number
): string {
  const trimmed = customSummary?.trim();
  if (trimmed && trimmed.length > 0) {
    return trimmed;
  }

  if (totalResponses === 0) {
    return "No reflections have been shared yet. The first voices shared this week will begin to shape what this place is saying.";
  }

  if (totalResponses === 1) {
    if (distinctAreas === 0) {
      return "1 reflection has been shared this week.";
    }
    return "1 reflection has been shared this week from 1 area.";
  }

  if (distinctAreas === 0) {
    return `${totalResponses} reflections have been shared this week.`;
  }
  if (distinctAreas === 1) {
    return `${totalResponses} reflections have been shared this week from 1 area.`;
  }
  return `${totalResponses} reflections have been shared this week from ${distinctAreas} areas.`;
}
