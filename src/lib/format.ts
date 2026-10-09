// Number/date formatting shared across screens (mirrors utils/lib.ts and utils/utils.js).

/** Strip everything but digits and re-group with commas, for money inputs. */
export function groupDigits(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("en-NG") : "";
}

/** 1500 -> "₦1,500" (formatNaira) */
export function formatNaira(value: number | null | undefined) {
  if (!value) return "₦0";
  return `₦${value.toLocaleString("en-NG")}`;
}

/** 1500 -> "₦1,500.00" (formatAmount) */
export function formatAmount(value: number | string | null | undefined) {
  const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  if (num == null || isNaN(num)) return "";
  return `₦${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(dateStr?: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatLongDate(dateStr?: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export function daysUntil(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export const schemeText = (scheme: string | undefined) => {
  if (scheme?.includes("Daily")) return "Daily";
  if (scheme?.includes("Weekly")) return "Weekly";
  if (scheme?.includes("Monthly")) return "Monthly";
  if (scheme?.includes("Auto")) return "Auto Finance";
  return scheme ?? "—";
};
