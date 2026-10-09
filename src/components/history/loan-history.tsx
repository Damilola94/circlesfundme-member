"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { InlineLoader } from "@/components/feedback/loader";
import { EmptyState, parseServerDate } from "@/components/dashboard/widgets";

type LoanStatus = "Pending" | "Waitlist" | "Approved" | "Active" | "Completed";

type Loan = {
  id?: string;
  requestedAmount?: number;
  amountRepaid?: number;
  firstRepaymentDate?: string;
  lastRepaymentDate?: string;
  dateApplied?: string;
  status: LoanStatus;
  percentageRepaid?: number;
  repaymentCount?: number;
  totalRepaymentCount?: number;
};

const STATUS_COLOR: Record<LoanStatus, string> = {
  Pending: "text-[#ffa500]",
  Waitlist: "text-[#999]",
  Approved: "text-brand",
  Active: "text-brand",
  Completed: "text-[#2e7d32]",
};

const d = (iso?: string) => (iso ? parseServerDate(iso).toLocaleDateString("en-GB") : "");

function LoanHistoryCard({ loan }: { loan: Loan }) {
  if (loan.status === "Pending" || loan.status === "Waitlist" || loan.status === "Approved") {
    return (
      <div className="rounded-3xl bg-white p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Loan Amount</p>
            <p className="text-xl font-medium">₦{(loan.requestedAmount ?? 0).toLocaleString()}</p>
          </div>
          <p className="text-xs text-muted-foreground">{d(loan.dateApplied) || "—"}</p>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className={STATUS_COLOR[loan.status]}>{loan.status}</span>
        </div>
      </div>
    );
  }
  if (loan.status !== "Active" && loan.status !== "Completed") return null;
  const progress = loan.percentageRepaid ?? 0;
  const range = loan.firstRepaymentDate && loan.lastRepaymentDate ? `${d(loan.firstRepaymentDate)} - ${d(loan.lastRepaymentDate)}` : "—";
  return (
    <Link
      href="/loan/loan-bank-payment/payment-method"
      className="block rounded-3xl bg-white p-4 transition-colors hover:bg-white/80"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Amount Repaid</p>
          <p className="text-xl font-medium">₦{(loan.amountRepaid ?? 0).toLocaleString()}</p>
        </div>
        <p className="text-xs text-muted-foreground">{range}</p>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs">
        <span className={STATUS_COLOR[loan.status]}>{loan.status}</span>
        <span className="text-muted-foreground">
          {loan.repaymentCount ?? 0}/{loan.totalRepaymentCount ?? 0}
        </span>
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e3e3e3]">
          <span className="block h-full rounded-full bg-brand" style={{ width: `${Math.min(progress, 100)}%` }} />
        </span>
        <span>{progress}%</span>
      </div>
    </Link>
  );
}

export function LoanHistory() {
  const [tab, setTab] = useState<"all" | "active">("all");
  const all = useQuery({ queryKey: ["loanApplications"], queryFn: () => api<Loan[]>({ endpoint: "loanapplications" }) });
  const active = useQuery({
    queryKey: ["users-my-loan-history"],
    queryFn: () => api<Loan[]>({ endpoint: "users", extra: "my-loan-history" }),
  });
  const loans = (tab === "all" ? all.data?.data : active.data?.data) ?? [];
  const loading = all.isLoading || active.isLoading;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-medium">Loans</h1>
      <div className="grid grid-cols-2 rounded-2xl bg-[#1e1e1e] p-1" role="tablist">
        {(["all", "active"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "relative py-3 text-sm text-white/60",
              tab === key && "text-white after:absolute after:inset-x-[20%] after:bottom-0 after:h-[3px] after:rounded-full after:bg-brand"
            )}
          >
            {key === "all" ? "All Loans" : "Active Loans"}
          </button>
        ))}
      </div>
      {loading ? (
        <InlineLoader message={`${tab === "all" ? "All Loans" : "Active Loans"} Loading...`} />
      ) : loans.length === 0 ? (
        <EmptyState title="No Loans Found" subtitle="You don’t have any loans in this category." />
      ) : (
        <div className="flex flex-col gap-3">
          {loans.map((loan, i) => (
            <LoanHistoryCard key={loan.id ?? `loan-${i}`} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}
