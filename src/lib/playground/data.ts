import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";
import type { FeedPage, SubmissionCardDTO } from "@/lib/playground/feed";
import { decodeCursor, encodeCursor } from "@/lib/playground/feed";

export type PromptDTO = {
  id: string;
  title: string | null;
  question: string;
  region_slug: string;
};

export async function getActivePrompt(regionSlug: string): Promise<PromptDTO | null> {
  const { data, error } = await supabaseAdmin
    .from("prompts")
    .select("id, title, question, region_slug")
    .eq("region_slug", regionSlug)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch active prompt: ${error.message}`);
  }

  return data;
}

const DEFAULT_FEED_LIMIT = 12;

export async function getApprovedFeedPage(params: {
  regionSlug: string;
  promptId: string;
  limit?: number;
  cursor?: string;
}): Promise<FeedPage> {
  const { regionSlug, promptId } = params;
  const limit = params.limit ?? DEFAULT_FEED_LIMIT;

  const { count: totalApproved, error: countError } = await supabaseAdmin
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("region_slug", regionSlug)
    .eq("prompt_id", promptId)
    .eq("approved", true)
    .eq("consent_public", true);

  if (countError) {
    throw new Error(`Failed to count submissions: ${countError.message}`);
  }

  let itemsQuery = supabaseAdmin
    .from("submissions")
    .select("id, name, neighborhood, response, created_at")
    .eq("region_slug", regionSlug)
    .eq("prompt_id", promptId)
    .eq("approved", true)
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
