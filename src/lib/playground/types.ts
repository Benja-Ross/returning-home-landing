export type RegionConfig = {
  slug: string;
  displayName: string;
  stewards: string[];
  introParagraphs: string[];
  /** Shown as helper text for the neighborhood/area field (e.g. "e.g. Buffalo, Tonawanda") */
  neighborhoodHint: string;
};
