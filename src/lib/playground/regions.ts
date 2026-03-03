import type { RegionConfig } from "./types";

export const REGIONS: Record<string, RegionConfig> = {
  "erie-niagara": {
    slug: "erie-niagara",
    displayName: "Erie-Niagara",
    stewards: [],
    introParagraphs: [
      "This playground is a space for the Erie-Niagara region to deepen connection to place and share reflections.",
    ],
    neighborhoodHint: "If someone from your region asked you where you live, what would you say?",
    hearingSummary:
      "We're hearing about things that often aren't appreciated, but with the right eyes there's so much more to them.",
  },
  "ann-arbor": {
    slug: "ann-arbor",
    displayName: "Ann Arbor",
    stewards: [],
    introParagraphs: [
      "This playground supports the Ann Arbor community in the Returning Home practice.",
    ],
    neighborhoodHint: "If someone from your region asked you where you live, what would you say?",
    hearingSummary:
      "So far this week we're hearing the voices of things that aren't often seen as having a voice.",
  },
  bangladesh: {
    slug: "bangladesh",
    displayName: "Bangladesh",
    stewards: [],
    introParagraphs: [
      "This playground is for participants in Bangladesh exploring Returning Home in place.",
    ],
    neighborhoodHint: "If someone from your region asked you where you live, what would you say?",
    hearingSummary:
      "This week we're hearing about the life in things that often aren't appreciated for having a life of their own.",
  },
} as const;

const VALID_SLUGS = Object.keys(REGIONS) as string[];

export function getRegion(regionSlug: string): RegionConfig | null {
  const normalized = regionSlug.toLowerCase().trim();
  if (!VALID_SLUGS.includes(normalized)) return null;
  return REGIONS[normalized] ?? null;
}
