export type SubmissionCardDTO = {
  id: string;
  name: string | null;
  neighborhood: string;
  response: string;
  created_at: string;
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
