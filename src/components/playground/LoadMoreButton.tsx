"use client";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
};

export function LoadMoreButton({ onClick, disabled, loading, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled ?? loading}
      className="w-full min-h-[44px] rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
    >
      {loading ? "Loading…" : children ?? "Load more"}
    </button>
  );
}
