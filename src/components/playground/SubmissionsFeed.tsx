"use client";

import { useState } from "react";

import type { SubmissionCardDTO } from "@/lib/playground/feed";
import { LoadMoreButton } from "./LoadMoreButton";
import { SubmissionCard } from "./SubmissionCard";

type Props = {
  regionSlug: string;
  promptId: string;
  initialItems: SubmissionCardDTO[];
  initialTotalApproved: number;
  initialNextCursor?: string;
};

export function SubmissionsFeed({
  regionSlug,
  promptId,
  initialItems,
  initialTotalApproved,
  initialNextCursor,
}: Props) {
  const [items, setItems] = useState(initialItems);
  const [totalApproved, setTotalApproved] = useState(initialTotalApproved);
  const [nextCursor, setNextCursor] = useState<string | undefined>(initialNextCursor);
  const [loadingMore, setLoadingMore] = useState(false);

  async function fetchPage(cursor?: string) {
    const params = new URLSearchParams({ regionSlug, promptId, ...(cursor && { cursor }) });
    const res = await fetch(`/api/playground/feed?${params}`);
    const data = (await res.json()) as {
      ok: boolean;
      items?: SubmissionCardDTO[];
      totalApproved?: number;
      nextCursor?: string;
      error?: string;
    };
    if (!res.ok || !data.ok) {
      throw new Error(data.error ?? "Failed to load");
    }
    return {
      items: data.items ?? [],
      totalApproved: data.totalApproved ?? 0,
      nextCursor: data.nextCursor,
    };
  }

  async function handleLoadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = await fetchPage(nextCursor);
      setItems((prev) => [...prev, ...page.items]);
      setTotalApproved(page.totalApproved);
      setNextCursor(page.nextCursor);
    } catch {
      // Could set error state; for MVP leave list as-is
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <section aria-labelledby="feed-heading">
      <h2 id="feed-heading" className="text-2xl font-semibold text-slate-900">
        Voices Shared ({totalApproved})
      </h2>

      {totalApproved === 0 ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-8 text-center">
          <p className="text-slate-700">
            No reflections have been published yet. Yours may be the first once reviewed.
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-6 list-none p-0 m-0">
            {items.map((sub) => (
              <li key={sub.id}>
                <SubmissionCard submission={sub} />
              </li>
            ))}
          </ul>
          {nextCursor && (
            <div className="mt-6">
              <LoadMoreButton onClick={handleLoadMore} loading={loadingMore}>
                Load more
              </LoadMoreButton>
            </div>
          )}
        </>
      )}
    </section>
  );
}
