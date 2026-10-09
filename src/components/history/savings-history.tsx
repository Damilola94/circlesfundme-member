"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { InlineLoader } from "@/components/feedback/loader";
import { ActivityItem, EmptyState, groupByDay, timeLabel, type ActivityRow } from "@/components/dashboard/widgets";

type SavingsEvent = {
  id: string;
  planName?: string;
  savingsSchemeName?: string;
  eventType?: string;
  amount?: number | string;
  occurredAt?: string;
};

const PAGE_SIZE = 10;

export function SavingsHistory() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["savings-history"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      api<SavingsEvent[]>({ endpoint: "savings/me/history", pQuery: { PageSize: PAGE_SIZE, PageNumber: pageParam } }),
    getNextPageParam: (last) =>
      last?.metaData?.pagination?.hasNext ? (last.metaData.pagination.currentPage ?? 1) + 1 : undefined,
  });
  const sentinel = useInfiniteScroll(() => !isFetchingNextPage && fetchNextPage(), !!hasNextPage);

  const events = data?.pages.flatMap((p) => p?.data ?? []) ?? [];
  const sections = groupByDay(events, (e) => e.occurredAt).map((s) => ({
    title: s.title,
    rows: s.rows.map<ActivityRow>((e) => {
      const type = e.eventType?.toLowerCase() ?? "";
      const credit = type.includes("contribution") || type.includes("deposit");
      const debit = type.includes("withdrawal");
      return {
        id: e.id,
        title: e.planName || e.savingsSchemeName || e.eventType || "Savings",
        time: timeLabel(e.occurredAt),
        amount: credit ? `+₦${e.amount}` : debit ? `-₦${e.amount}` : undefined,
        tone: credit ? "credit" : debit ? "debit" : "pending",
      };
    }),
  }));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-medium">Savings History</h1>
      {isLoading ? (
        <InlineLoader message="Loading history..." />
      ) : events.length === 0 ? (
        <EmptyState
          title="No history yet"
          subtitle="Your savings activity will appear here once you start transacting."
        />
      ) : (
        sections.map((section) => (
          <section key={section.title} className="rounded-3xl bg-white px-4 py-3">
            <p className="text-xs text-muted-foreground">{section.title}</p>
            <ul>
              {section.rows.map((row) => (
                <ActivityItem key={row.id} row={row} />
              ))}
            </ul>
          </section>
        ))
      )}
      <div ref={sentinel} />
      {isFetchingNextPage && <p className="text-center text-sm text-muted-foreground">Loading more...</p>}
    </div>
  );
}
