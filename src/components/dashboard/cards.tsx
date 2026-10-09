"use client";

import { ArrowRight, CircleAlert, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex h-[196px] flex-col justify-between overflow-hidden rounded-[28px] p-5 text-white",
        "bg-[radial-gradient(circle_at_85%_120%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_35%,transparent_36%)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SchemePill({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-medium">{children}</span>;
}

function NextDue({ date }: { date?: string | null }) {
  return (
    <div className="text-right">
      <p className="text-[10px] text-white/70">Next Due</p>
      <p className="text-sm">{date || "No due date"}</p>
    </div>
  );
}

function CardButton({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 items-center gap-2 rounded-full bg-white px-6 text-base text-foreground transition-colors hover:bg-white/90"
    >
      {children}
    </button>
  );
}

export type LoanStatus = "Apply for Loan" | "Active" | "Pending" | "Waitlist" | string;

const STATUS: Record<string, { label: string; dot: string; bg: string }> = {
  Active: { label: "Active", dot: "bg-[#28a745]", bg: "bg-[#28a745]/20 text-[#28a745]" },
  Pending: { label: "Pending", dot: "bg-[#ffc107]", bg: "bg-[#ffc107]/20 text-[#ffc107]" },
  Waitlist: { label: "Waitlisted", dot: "bg-white", bg: "bg-white/20 text-white" },
};

export function StatusBadge({ status }: { status: { label: string; dot: string; bg: string } }) {
  return (
    <span className={cn("flex h-10 items-center gap-2 rounded-full px-4 text-base", status.bg)}>
      <span className={cn("size-2 rounded-full", status.dot)} />
      {status.label}
    </span>
  );
}

export function LoanCard({
  amount,
  scheme,
  nextTranDate,
  loanStatus,
  onApply,
  onStatusInfo,
}: {
  amount: string;
  scheme: string;
  nextTranDate?: string;
  loanStatus?: LoanStatus;
  onApply: () => void;
  onStatusInfo: () => void;
}) {
  const status = loanStatus ? STATUS[loanStatus] : undefined;
  return (
    <Card className="bg-[#1e1e1e]">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Maximum Loan Eligible</p>
          <SchemePill>{scheme}</SchemePill>
        </div>
        <p className="mt-2 text-[30px] font-medium">{amount}</p>
      </div>
      <div className="flex items-end justify-between">
        {status ? (
          <div className="flex items-center gap-2">
            <StatusBadge status={status} />
            <button type="button" onClick={onStatusInfo} aria-label="About this status">
              <CircleAlert className="size-4" />
            </button>
          </div>
        ) : (
          <CardButton onClick={onApply}>Apply for Loan</CardButton>
        )}
        <NextDue date={nextTranDate} />
      </div>
    </Card>
  );
}

export function ContributionCard({
  amount,
  scheme,
  nextTranDate,
  onLien,
  onWithdraw,
}: {
  amount: string;
  scheme: string;
  nextTranDate?: string;
  onLien?: boolean;
  onWithdraw: () => void;
}) {
  return (
    <Card className="bg-[#005b41]">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Your Contribution</p>
          <SchemePill>{scheme}</SchemePill>
        </div>
        <p className="mt-2 text-[30px] font-medium">{amount}</p>
      </div>
      <div className="flex items-end justify-between">
        {onLien ? (
          <StatusBadge status={{ label: "Lien Active", dot: "bg-[#28a745]", bg: "bg-[#28a745]/20 text-[#28a745]" }} />
        ) : (
          <CardButton onClick={onWithdraw}>Withdraw</CardButton>
        )}
        <NextDue date={nextTranDate} />
      </div>
    </Card>
  );
}

const RESERVE_COPY = {
  Accumulating: "You’re still working towards your equity target. Contributions move here once it’s complete.",
  Reserving: "Contributions after your equity is complete accumulate here until your loan is disbursed.",
  Completed: "Your loan has been disbursed and this balance has moved to your contribution wallet.",
} as const;

export function ReserveCard({
  amount,
  scheme,
  status,
}: {
  amount: string;
  scheme: string;
  status?: keyof typeof RESERVE_COPY;
}) {
  return (
    <Card className="bg-[#2b3a36]">
      <div className="flex items-center justify-between">
        <p className="text-sm">Reserve Account</p>
        <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px]">
          <Lock className="size-3" />
          Read-only
        </span>
      </div>
      <div>
        <p className="text-[30px] font-medium">{amount}</p>
        {scheme && <p className="text-xs text-white/70">{scheme}</p>}
      </div>
      <p className="text-xs leading-relaxed text-white/80">{RESERVE_COPY[status ?? "Reserving"]}</p>
    </Card>
  );
}

export function SavingsCard({
  amount,
  scheme,
  nextDue,
  onView,
}: {
  amount: string;
  scheme: string;
  nextDue?: string;
  onView: () => void;
}) {
  return (
    <Card className="bg-forest">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Total Amount</p>
          <SchemePill>{scheme}</SchemePill>
        </div>
        <p className="mt-2 text-[30px] font-medium">{amount || 0}</p>
      </div>
      <div className="flex items-end justify-between">
        <CardButton onClick={onView}>
          View Savings <ArrowRight className="size-4" />
        </CardButton>
        <NextDue date={nextDue} />
      </div>
    </Card>
  );
}

/** Horizontally swipeable cards with page dots. */
export function CardCarousel({
  cards,
  activeIndex,
  onActiveIndexChange,
}: {
  cards: { key: string; node: React.ReactNode }[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}) {
  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / (el.firstElementChild?.clientWidth ?? el.clientWidth));
    if (index !== activeIndex) onActiveIndexChange(index);
  }
  function goTo(index: number, el: HTMLElement | null) {
    el?.scrollTo({ left: index * (el.firstElementChild?.clientWidth ?? 0), behavior: "smooth" });
  }

  return (
    <div>
      <div
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth px-4"
        aria-roledescription="carousel"
      >
        {cards.map((card, i) => (
          <div
            key={`${card.key}-${i}`}
            className="w-[92%] shrink-0 snap-center pr-3"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${cards.length}`}
          >
            {card.node}
          </div>
        ))}
      </div>
      {cards.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {cards.map((card, i) => (
            <button
              key={`${card.key}-dot-${i}`}
              type="button"
              aria-label={`Show card ${i + 1}`}
              onClick={(e) => goTo(i, e.currentTarget.parentElement?.previousElementSibling as HTMLElement)}
              className={cn("h-1.5 rounded-full transition-all", i === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-[#c9c9c9]")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Green "You haven't setup payments yet — Complete Setup" banner. */
export function SetupNotice({ title, buttonText, onPress }: { title: string; buttonText: string; onPress: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-brand px-4 py-3 text-white">
      <div className="flex items-center gap-2.5 text-sm">
        <CircleAlert className="size-5 shrink-0" />
        {title}
      </div>
      <button
        type="button"
        onClick={onPress}
        className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs text-foreground hover:bg-white/90"
      >
        {buttonText}
      </button>
    </div>
  );
}

export function ContributionsMadeCard({
  amount = 0,
  installmentDesc = "0 of 52",
  preInstallmentDesc = "0 of 0",
}: {
  amount?: number;
  installmentDesc?: string;
  preInstallmentDesc?: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-4">
      <p className="text-base">Contributions made</p>
      <hr className="my-3 border-[#eee]" />
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subscription amount</dt>
          <dd>₦{(amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Pre Loan Installments</dt>
          <dd>{preInstallmentDesc}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Post Loan Installments</dt>
          <dd>{installmentDesc}</dd>
        </div>
      </dl>
    </div>
  );
}
