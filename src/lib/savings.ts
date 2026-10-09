export type SavingsPlan = {
  id: string;
  name: string;
  balance: number;
  walletBalance?: number;
  maturityDate: string;
  nextDebitDate: string;
  status: number;
  contributionAmount: number;
  frequency: number;
  savingsScheme?: { name: string };
};

export type PlanDetail = {
  id: string;
  name: string;
  frequency: number;
  contributionAmount: number;
  durationInMonths: number;
  commencementDate: string;
  maturityDate: string;
  balance: number;
  accruedInterest: number;
  totalInterestCredited: number;
  nextDebitDate: string;
  lastDebitDate: string | null;
  status: number;
};

export function statusLabel(status: number) {
  const map: Record<number, { label: string; className: string }> = {
    1: { label: "Active", className: "bg-[#e1f5ee] text-[#0f6e56]" },
    2: { label: "Paused", className: "bg-[#faeeda] text-[#ba7517]" },
    3: { label: "Matured", className: "bg-[#e6f1fb] text-[#185fa5]" },
    4: { label: "Cancelled", className: "bg-[#fcebeb] text-[#a32d2d]" },
  };
  return map[status] ?? { label: "Unknown", className: "bg-[#f0f0f0] text-[#888]" };
}

export const frequencyLabel = (freq: number) => ({ 1: "Daily", 2: "Weekly", 3: "Monthly" })[freq] ?? "—";

/** ₦1.5m / ₦250k style amounts (formatAmountWithThresholds). */
export function shortAmount(value: number | string | null | undefined) {
  const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : (value ?? 0);
  if (isNaN(num)) return "";
  const short = (n: number, unit: string) => {
    const s = n.toFixed(1);
    return (s.endsWith(".0") ? s.slice(0, -2) : s) + unit;
  };
  if (num >= 1_000_000_000) return `₦${short(num / 1_000_000_000, "b")}`;
  if (num >= 1_000_000) return `₦${short(num / 1_000_000, "m")}`;
  if (num >= 1_000) return `₦${short(num / 1_000, "k")}`;
  return `₦${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
