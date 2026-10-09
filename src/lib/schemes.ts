import type { OnboardingDraft } from "@/lib/onboarding-draft";

export const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const MONTH_DAY_OPTIONS = [
  { label: "1st", value: "First" },
  { label: "2nd", value: "Second" },
  { label: "3rd", value: "Third" },
  { label: "4th", value: "Fourth" },
  { label: "5th", value: "Fifth" },
  { label: "6th", value: "Sixth" },
  { label: "7th", value: "Seventh" },
  { label: "8th", value: "Eighth" },
  { label: "9th", value: "Ninth" },
  { label: "10th", value: "Tenth" },
  { label: "11th", value: "Eleventh" },
  { label: "12th", value: "Twelfth" },
  { label: "13th", value: "Thirteenth" },
  { label: "14th", value: "Fourteenth" },
  { label: "15th", value: "Fifteenth" },
  { label: "16th", value: "Sixteenth" },
  { label: "17th", value: "Seventeenth" },
  { label: "18th", value: "Eighteenth" },
  { label: "19th", value: "Nineteenth" },
  { label: "20th", value: "Twentieth" },
  { label: "21st", value: "TwentyFirst" },
  { label: "22nd", value: "TwentySecond" },
  { label: "23rd", value: "TwentyThird" },
  { label: "24th", value: "TwentyFourth" },
  { label: "25th", value: "TwentyFifth" },
  { label: "26th", value: "TwentySixth" },
  { label: "27th", value: "TwentySeventh" },
  { label: "28th", value: "TwentyEighth" },
  { label: "End of Month", value: "EndOfMonth" },
];
export const MONTH_DAY_LABELS = MONTH_DAY_OPTIONS.map((o) => o.label);
export const monthDayValue = (label: string) => MONTH_DAY_OPTIONS.find((o) => o.label === label)?.value ?? "";

export const CONTRIBUTION_SCHEMES = [
  "Daily Contribution Scheme",
  "Weekly Contribution Scheme",
  "Monthly Contribution Scheme",
  "Auto Financing",
  "Tricycle Financing",
];
export const REMITTANCE_TYPES = ["Daily", "Weekly", "Monthly"];
export const EQUITY_PERCENT_OPTIONS = [10, 20, 30];

export const LUMP_SUM = "Lump sum (one-time saving)";
export const SAVINGS_FREQUENCY_OPTIONS = ["Daily", "Weekly", "Monthly", LUMP_SUM];
export const SAVINGS_DURATION_OPTIONS = [
  { label: "30 days", months: 1 },
  { label: "90 days", months: 3 },
  { label: "180 days", months: 6 },
  { label: "270 days", months: 9 },
  { label: "365 days", months: 12 },
];

export type SavingsSchemeItem = {
  id: string;
  name: string;
  description: string;
  schemeType: number;
  interestRatePerAnnumPercent: number;
};

export type ProjectionData = {
  savingAmount: number;
  totalSavings: number;
  interestRatePerAnnumPercent: number;
  interestValue: number;
  totalFutureValue: number;
  commencementDate: string;
  maturityDate: string;
  durationInMonths: number;
  frequency: string;
};

export const toNumber = (val: string | number | null | undefined) =>
  val == null ? 0 : parseFloat(String(val).replace(/,/g, "")) || 0;

/** The identity part of `accounts/complete-onboarding`, built from the onboarding draft. */
export function onboardingIdentity(draft: OnboardingDraft) {
  const [day = "", month = "", year = ""] = (draft.dob ?? "").split("/");
  return {
    FullName: draft.fullName ?? "",
    PhoneNumber: (draft.phone ?? "").replace(/^0/, "+234"),
    DateOfBirth: year ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : "",
    Gender: draft.gender ?? "",
    Address: draft.userAddress ?? "",
    BVN: draft.bvn ?? "",
    GovernmentIssuedIDUrl: draft.documentUrl,
    UtilityBillUrl: draft.utilityBillUrl,
    SelfieUrl: draft.selfieUrl,
  };
}
