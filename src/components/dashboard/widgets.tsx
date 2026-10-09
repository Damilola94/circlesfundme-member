"use client";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { InlineLoader } from "@/components/feedback/loader";
import ImportIcons from "@/components/icons/import-icons";
import ExportIcons from "@/components/icons/export-icons";
import LoanProgressBronze from "@/components/icons/loan-progress-bronze";
import LoanProgressSilver from "@/components/icons/loan-progress-silver";
import LoanProgressPlatinum from "@/components/icons/loan-progress-platinum";
import LoanProgressGold from "@/components/icons/loan-progress-gold";

// ---------------------------------------------------------------- Eligibility tiers

enum TierStatus {
  Completed = 1,
  Current = 2,
  Locked = 3,
}

type Tier = {
  tier: number;
  tierName: string;
  status: TierStatus;
  eligibleAmount: number;
  repaymentInstallments: number;
};

const TIER_ICONS: Record<number, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  1: LoanProgressBronze,
  2: LoanProgressSilver,
  3: LoanProgressPlatinum,
  4: LoanProgressGold,
};

export function EligibilityTracker() {
  const { data } = useQuery({
    queryKey: ["loan-eligibility-tier"],
    queryFn: () => api<{ tiers: Tier[] }>({ endpoint: "loanapplications/my-eligibility-tier" }),
  });
  const tiers = data?.data?.tiers ?? [];
  if (tiers.length === 0) return null;

  return (
    <div className="rounded-3xl bg-white px-4 py-4">
      <div className="flex items-center px-3">
        {tiers.map((tier, i) => {
          const locked = tier.status === TierStatus.Locked;
          const fill = tier.status === TierStatus.Completed ? "100%" : tier.status === TierStatus.Current ? "50%" : "0%";
          return (
            <Fragment key={tier.tier}>
              <span className={cn("size-2.5 shrink-0 rounded-full", locked ? "bg-[#c9c9c9]" : "bg-brand")} />
              {i < tiers.length - 1 && (
                <span className="relative h-1 flex-1 rounded-full bg-[#e3e3e3]">
                  <span className="absolute inset-y-0 left-0 rounded-full bg-brand" style={{ width: fill }} />
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}>
        {tiers.map((tier) => {
          const Icon = TIER_ICONS[tier.tier] ?? LoanProgressBronze;
          const locked = tier.status === TierStatus.Locked;
          return (
            <div key={tier.tier} className="text-center">
              <p className={cn("flex items-center justify-center gap-1 text-[10px]", locked && "text-muted-foreground")}>
                <Icon width={12} height={12} />
                {tier.tierName}
              </p>
              <p className={cn("text-sm font-medium", locked && "text-muted-foreground")}>
                ₦{tier.eligibleAmount.toLocaleString("en-NG")}
              </p>
              <p className="text-[10px] text-muted-foreground">{tier.repaymentInstallments} Days</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Equity top-up

export function EquityTopUpCard({
  isEligible,
  ineligibilityReason,
  equityTarget,
  paidEquity,
  outstandingBalance,
  eligibleFromDate,
  progress,
  isPending,
  onTopUp,
}: {
  isEligible: boolean;
  ineligibilityReason?: string;
  equityTarget?: string;
  paidEquity?: string;
  outstandingBalance?: string;
  eligibleFromDate?: string;
  progress: number;
  isPending?: boolean;
  onTopUp: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white p-4">
      <p className="text-base font-medium">Complete your equity</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e3e3e3]">
        <div className="h-full rounded-full bg-brand" style={{ width: `${progress * 100}%` }} />
      </div>
      <p className="mt-2 text-sm">
        <span className="font-medium">{paidEquity ?? "₦0.00"}</span>{" "}
        <span className="text-muted-foreground">of {equityTarget ?? "₦0.00"}</span>
      </p>
      <p className="text-xs text-muted-foreground">{outstandingBalance ?? "₦0.00"} left to pay</p>
      <Button size="pill" className="mt-4 w-full" disabled={!isEligible || isPending} onClick={onTopUp}>
        {isPending ? "Starting payment..." : "Complete My Equity"}
      </Button>
      {!isEligible && (
        <p className="mt-2 text-xs text-muted-foreground">
          {ineligibilityReason ??
            (eligibleFromDate ? `You can top up from ${eligibleFromDate}.` : "Equity top-up isn’t available yet.")}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Recent activity

type Activity = { id: string; title: string; type: number; data: string; createdAt?: string };

/** Backend timestamps without a zone designator are UTC (the mobile app shifted them +1h for WAT). */
export function parseServerDate(value?: string) {
  if (!value) return new Date(NaN);
  return new Date(/[zZ]|[+-]\d{2}:?\d{2}$/.test(value) ? value : `${value}Z`);
}

/** "TODAY" / "YESTERDAY" / "12 JUNE" headings, like moment().calendar() in the mobile app. */
export function dayLabel(iso?: string) {
  if (!iso) return "N/A";
  const date = parseServerDate(iso);
  if (isNaN(date.getTime())) return "N/A";
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startOf(new Date()) - startOf(date)) / 86_400_000);
  if (diffDays === 0) return "TODAY";
  if (diffDays === 1) return "YESTERDAY";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long" }).toUpperCase();
}

export function timeLabel(iso?: string) {
  if (!iso) return "N/A";
  const date = parseServerDate(iso);
  return isNaN(date.getTime()) ? "N/A" : date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export type ActivityRow = { id: string; title: string; time: string; amount?: string; tone: "credit" | "debit" | "pending" };

export function groupByDay<T>(items: T[], getDate: (item: T) => string | undefined) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = dayLabel(getDate(item));
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return Array.from(groups, ([title, rows]) => ({ title, rows }));
}

export function ActivityItem({ row, as: Tag = "li" }: { row: ActivityRow; as?: "li" | "div" }) {
  return (
    <Tag className="flex items-center gap-3 py-2.5">
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          row.tone === "pending" ? "bg-[#fef9e7]" : row.tone === "credit" ? "bg-[#e0f9f1]" : "bg-[#fde9e9]"
        )}
      >
        {row.tone === "pending" ? (
          <CircleAlert className="size-6 text-[#e6bb1d]" />
        ) : row.tone === "credit" ? (
          <ImportIcons />
        ) : (
          <ExportIcons />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-base">{row.title}</p>
        <p className="text-xs text-muted-foreground">{row.time}</p>
      </div>
      {row.amount && (
        <p className={cn("shrink-0 text-base", row.tone === "credit" ? "text-[#00c281]" : "text-[#d01d1d]")}>
          {row.amount}
        </p>
      )}
    </Tag>
  );
}

export function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-10 text-center">
      <p className="text-base text-muted-foreground">{title}</p>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function RecentActivityList() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-recent-activities"],
    queryFn: () =>
      api<Activity[]>({ endpoint: "users/my-recent-activities", pQuery: { PageSize: 20, Type: "None", PageNumber: 1 } }),
  });
  const activities = data?.data ?? [];
  const sections = groupByDay(activities, (a) => a.createdAt).map((s) => ({
    title: s.title,
    rows: s.rows.map<ActivityRow>((item) => {
      const isCredit = item.type === 1 || item.type === 4;
      return {
        id: item.id,
        title: item.title || (isCredit ? "Contribution" : "Withdrawal"),
        time: timeLabel(item.createdAt),
        amount: item.type === 3 ? undefined : `${isCredit ? "+" : "-"} ₦${parseFloat(item.data || "0").toFixed(2)}`,
        tone: item.type === 3 ? "pending" : isCredit ? "credit" : "debit",
      };
    }),
  }));

  return (
    <section className="rounded-3xl bg-white px-4 pt-4 pb-2">
      <h2 className="text-xl font-medium">Recent Activity</h2>
      {isLoading ? (
        <InlineLoader message="Recent Activity Loading..." />
      ) : activities.length === 0 ? (
        <EmptyState title="No recent activity" />
      ) : (
        sections.map((section) => (
          <div key={section.title} className="mt-3">
            <p className="text-xs text-muted-foreground">{section.title}</p>
            <ul>
              {section.rows.map((row) => (
                <ActivityItem key={row.id} row={row} />
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}
