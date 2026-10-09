"use client";

import { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Button } from "@/components/ui/button";
import { InlineLoader } from "@/components/feedback/loader";
import { ActivityItem, EmptyState, groupByDay, timeLabel } from "@/components/dashboard/widgets";

type NotificationItem = {
  id: string;
  title: string;
  type: number | string;
  data: string;
  createdDate?: string;
};

const PAGE_SIZE = 10;

/** Cluster invitations carry "ClusterId=...;ClusterName=...;Role=..." in `data`. */
function parseClusterData(data: string) {
  if (!data) return null;
  const parts = Object.fromEntries(
    data.split(";").map((part) => {
      const [key, ...rest] = part.split("=");
      return [key, rest.join("=")];
    })
  );
  return { clusterId: parts.ClusterId ?? "", clusterName: parts.ClusterName ?? "", role: parts.Role ?? "" };
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["notifications"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      api<NotificationItem[]>({ endpoint: "notifications", pQuery: { PageSize: PAGE_SIZE, PageNumber: pageParam } }),
    getNextPageParam: (last, pages) => (last?.data?.length === PAGE_SIZE ? pages.length + 1 : undefined),
  });
  const sentinel = useInfiniteScroll(() => !isFetchingNextPage && fetchNextPage(), !!hasNextPage);

  const respond = useMutation({
    mutationFn: (body: { clusterMemberId: string; accept: boolean }) =>
      api({ endpoint: "clusters/invitations/respond", method: "POST", body }),
    onSuccess: (res, vars) => {
      if (res?.isSuccess) {
        showToast({
          type: "success",
          text1: vars.accept ? "Invitation Accepted" : "Invitation Declined",
          text2: vars.accept ? "You have joined the cluster." : "You have declined the invitation.",
        });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } else {
        showToast({ type: "error", text1: "Failed", text2: res?.message || "Something went wrong." });
      }
      setRespondingId(null);
    },
    onError: (error: Error) => {
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong." });
      setRespondingId(null);
    },
  });

  function handleRespond(clusterMemberId: string, notificationId: string, accept: boolean) {
    setRespondingId(`${notificationId}-${accept ? "accept" : "reject"}`);
    respond.mutate({ clusterMemberId, accept });
  }

  const items = data?.pages.flatMap((p) => p?.data ?? []) ?? [];
  const sections = groupByDay(items, (i) => i.createdDate);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-medium">Notifications</h1>
      {isLoading ? (
        <InlineLoader message="Notification Loading..." />
      ) : items.length === 0 ? (
        <EmptyState title="No notifications yet" />
      ) : (
        sections.map((section) => (
          <section key={section.title} className="rounded-3xl bg-white px-4 py-3">
            <p className="text-xs text-muted-foreground">{section.title}</p>
            <ul>
              {section.rows.map((item) => {
                const amount =
                  item.type === "Contribution" ? `+₦${item.data}` : item.type === "Withdrawal" ? `-₦${item.data}` : undefined;
                const cluster = item.type === 4 ? parseClusterData(item.data) : null;
                return (
                  <li key={item.id}>
                    <ActivityItem
                      as="div"
                      row={{
                        id: item.id,
                        title: item.title,
                        time: timeLabel(item.createdDate),
                        amount,
                        tone: amount?.startsWith("+") ? "credit" : amount ? "debit" : "pending",
                      }}
                    />
                    {cluster && (
                      <div className="mb-3 ml-14 flex items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">Role: {cluster.role}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="danger-outline"
                            className="h-9 rounded-full px-4"
                            disabled={respondingId !== null}
                            onClick={() => handleRespond(cluster.clusterId, item.id, false)}
                          >
                            {respondingId === `${item.id}-reject` ? <Loader2 className="animate-spin" /> : "Decline"}
                          </Button>
                          <Button
                            size="sm"
                            className="h-9 rounded-full px-4"
                            disabled={respondingId !== null}
                            onClick={() => handleRespond(cluster.clusterId, item.id, true)}
                          >
                            {respondingId === `${item.id}-accept` ? <Loader2 className="animate-spin" /> : "Accept"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
      <div ref={sentinel} />
      {isFetchingNextPage && <p className="text-center text-sm text-muted-foreground">Loading more...</p>}
    </div>
  );
}
