import type { RegionConfig } from "./types";

export const REGIONS: Record<string, RegionConfig> = {
  "erie-niagara": {
    slug: "erie-niagara",
    displayName: "Erie–Niagara",
    stewards: [],
    introParagraphs: [
      "This playground is a space for the Erie–Niagara region to deepen connection to place and share reflections.",
    ],
  },
  "ann-arbor": {
    slug: "ann-arbor",
    displayName: "Ann Arbor",
    stewards: [],
    introParagraphs: [
      "This playground supports the Ann Arbor community in the Returning Home practice.",
    ],
  },
  bangladesh: {
    slug: "bangladesh",
    displayName: "Bangladesh",
    stewards: [],
    introParagraphs: [
      "This playground is for participants in Bangladesh exploring Returning Home in place.",
    ],
  },
} as const;

const VALID_SLUGS = Object.keys(REGIONS) as string[];

export function getRegion(regionSlug: string): RegionConfig | null {
  const normalized = regionSlug.toLowerCase().trim();
  if (!VALID_SLUGS.includes(normalized)) return null;
  return REGIONS[normalized] ?? null;
}
