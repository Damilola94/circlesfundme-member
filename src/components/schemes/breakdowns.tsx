"use client";

import { cn } from "@/lib/utils";
import { EQUITY_PERCENT_OPTIONS, MONTH_DAY_LABELS, REMITTANCE_TYPES, WEEK_DAYS } from "@/lib/schemes";
import { SelectField, TextField } from "@/components/forms/field";
import { SummaryCard } from "@/components/data/summary-card";

/** Shape of `contributionschemes/{auto,tricycle}-finance-breakdown` (amounts are pre-formatted strings). */
export type VehicleBreakdown = {
  baseContributionAmount: number;
  costOfVehicle: string;
  extraEngine: string;
  extraTyre: string;
  insurance: string;
  processingFee: string;
  totalAssetValue?: string;
  downPayment: string;
  loanManagementFee: string;
  preLoanServiceCharge: string;
  postLoanWeeklyContribution: string;
  loanProtectionFund: string;
  eligibleLoan: string;
  totalRepayment: string | number;
  equityPercent: string;
  tenureYears: string;
  numberOfInstallments: string;
  numberOfCyclesToCompleteEquity: string | null;
};

/** Shape of `contributionschemes/regular-finance-breakdown` (amounts include "₦ "). */
export type RegularBreakdown = {
  principalLoan: string;
  loanManagementFee: string;
  eligibleLoan: string;
  insurance: string;
  processingFee: string;
  loanProtectionFund: string;
  eligibleLoanAfterInsurance: string;
  preLoanServiceCharge: string;
  postLoanServiceCharge: string;
  totalRepayment: string;
  repaymentTerm: string;
  downPayment: string;
  countToQualifyForLoan: number | null;
};

export type VehicleKind = "auto" | "tricycle";

export function EquityPercentPicker({
  value,
  onChange,
  label = "Equity Contribution",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-base">{label}</p>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={label}>
        {EQUITY_PERCENT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "h-11 rounded-full border bg-white text-sm transition-colors",
              value === option ? "border-brand bg-brand-soft font-medium text-brand" : "border-transparent"
            )}
          >
            {option}%{option === 10 ? " (default)" : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RemittanceDayField({
  period,
  weekDay,
  onWeekDayChange,
  monthDay,
  onMonthDayChange,
}: {
  period: string;
  weekDay: string;
  onWeekDayChange: (v: string) => void;
  monthDay: string;
  onMonthDayChange: (v: string) => void;
}) {
  if (period === "Weekly") {
    return (
      <SelectField
        label="Remittance Day"
        placeholder="Choose contribution day"
        options={WEEK_DAYS}
        value={weekDay}
        onSelect={onWeekDayChange}
      />
    );
  }
  if (period === "Monthly") {
    return (
      <SelectField
        label="Remittance Day"
        placeholder="Choose contribution day"
        options={MONTH_DAY_LABELS}
        value={monthDay}
        onSelect={onMonthDayChange}
      />
    );
  }
  return null;
}

const naira = (v: string | number | null | undefined) => `₦${v ?? ""}`;

export function RegularBreakdownSummary({
  breakdown,
  scheme,
  equityPercent,
}: {
  breakdown: RegularBreakdown;
  scheme: string;
  equityPercent: number;
}) {
  const multiple = scheme.includes("Weekly")
    ? "52x of your weekly contribution"
    : scheme.includes("Daily")
      ? "365x of your daily contribution"
      : "12x of your monthly contribution";
  return (
    <SummaryCard
      rows={[
        { label: "Principal Loan", hint: multiple, value: breakdown.principalLoan },
        { label: "Loan Mgt. Fee (6%)", hint: "Loan Mgt. Fee over 4 years", value: breakdown.loanManagementFee },
        { label: "Insurance Fee", value: breakdown.insurance },
        { label: "Processing Fee", value: breakdown.processingFee },
        { label: "Loan Protection Fee", value: breakdown.loanProtectionFund },
        { label: `Equity Contribution (${equityPercent}%)`, value: breakdown.downPayment },
        { label: "Eligible Loan", hint: multiple, value: breakdown.eligibleLoanAfterInsurance, emphasis: true },
        { label: "Repayment Duration", value: scheme.includes("Weekly") ? "52 weeks/1 yr" : "12 months/1yr" },
        { label: "Pre-Loan Service Charge", value: breakdown.preLoanServiceCharge },
        { label: "Post-Loan Service Charge", value: breakdown.postLoanServiceCharge },
        ...(breakdown.countToQualifyForLoan != null
          ? [{ label: "Cycles to Qualify for Loan", value: `${breakdown.countToQualifyForLoan} contributions` }]
          : []),
        { label: "Total Repayment", value: breakdown.totalRepayment },
        { label: "Repayment Term", value: breakdown.repaymentTerm },
      ]}
    />
  );
}

/** Auto/tricycle financing breakdown plus the remittance and contribution inputs that depend on it. */
export function VehicleBreakdownFields({
  kind,
  breakdown,
  equityPercent,
  remittanceType,
  onRemittanceTypeChange,
  weekDay,
  onWeekDayChange,
  monthDay,
  onMonthDayChange,
  preLoanCharge,
  minContribution,
  intendedContribution,
  onIntendedContributionChange,
  isIntendedTooLow,
  totalContribution,
  referralCode,
  onReferralCodeChange,
}: {
  kind: VehicleKind;
  breakdown: VehicleBreakdown;
  equityPercent: number;
  remittanceType: string;
  onRemittanceTypeChange: (v: string) => void;
  weekDay: string;
  onWeekDayChange: (v: string) => void;
  monthDay: string;
  onMonthDayChange: (v: string) => void;
  preLoanCharge: number;
  minContribution: number;
  intendedContribution: string;
  onIntendedContributionChange: (v: string) => void;
  isIntendedTooLow: boolean;
  totalContribution: number;
  referralCode?: string;
  onReferralCodeChange?: (v: string) => void;
}) {
  const years = kind === "auto" ? 4 : 2;
  const equity = breakdown.equityPercent || `${equityPercent}%`;
  const period = remittanceType === "Daily" ? "Daily" : remittanceType === "Weekly" ? "Weekly" : "Monthly";
  const minFormatted = `₦${Math.ceil(minContribution).toLocaleString()}`;

  return (
    <div className="flex flex-col gap-5">
      <SummaryCard
        rows={[
          { label: "Cost of Vehicle", value: naira(breakdown.costOfVehicle) },
          ...(kind === "auto"
            ? [
                { label: "Extra engine (10%)", value: naira(breakdown.extraEngine) },
                { label: "Extra Tyres (10%)", value: naira(breakdown.extraTyre) },
              ]
            : []),
          { label: `Insurance (over ${years} years)`, value: naira(breakdown.insurance) },
          { label: "Processing Fee", value: naira(breakdown.processingFee) },
          { label: "Loan Protection Fee", value: naira(breakdown.loanProtectionFund) },
          ...(breakdown.totalAssetValue ? [{ label: "Total Asset Value", value: naira(breakdown.totalAssetValue) }] : []),
        ]}
      />
      <TextField
        label="User Contribution (Down Payment)"
        value={naira(breakdown.downPayment)}
        readOnly
        info={{
          title: "User Contribution (Down Payment)",
          content: `${equity} of total asset value. Paid from user's savings contribution.`,
        }}
      />
      <TextField
        label="Eligible Loan (Principal)"
        value={naira(breakdown.eligibleLoan)}
        readOnly
        info={{ title: "Eligible Loan (Principal)", content: "90% of total asset value." }}
      />
      <TextField
        label={`Loan Management Fee over ${years} years`}
        value={naira(breakdown.loanManagementFee)}
        readOnly
        info={{
          title: `Loan Management Fee over ${years} years`,
          content: `Annually: 6% of Asset Value. Total for ${years} Years: Annual Loan Management Fee × ${years}`,
        }}
      />
      <SelectField
        label="Remittance Type"
        placeholder="Choose remittance type for your equity"
        options={REMITTANCE_TYPES}
        value={remittanceType}
        onSelect={onRemittanceTypeChange}
      />
      <RemittanceDayField
        period={remittanceType}
        weekDay={weekDay}
        onWeekDayChange={onWeekDayChange}
        monthDay={monthDay}
        onMonthDayChange={onMonthDayChange}
      />
      <TextField
        label="Pre-Loan Service Charge"
        value={`₦${preLoanCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
        readOnly
        info={{
          title: "Pre-Loan Service Charge",
          content: `A service charge as you save up your ${equity} equity.`,
        }}
      />
      <TextField
        label={`Minimum ${period} Contribution`}
        placeholder="Enter Amount"
        valueType="money"
        value={intendedContribution}
        onValueChange={onIntendedContributionChange}
        error={isIntendedTooLow ? `Amount must be ${minFormatted} or more.` : undefined}
        info={{
          title: `Minimum ${period} Contribution`,
          content: `Enter any amount from ${minFormatted} and above to save toward your ${equity} equity down payment.`,
        }}
      />
      <TextField
        label={`Total Minimum ${period} Contribution`}
        value={`₦${totalContribution.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
        readOnly
        info={{
          title: `Total Minimum ${period} Contribution`,
          content: `Your ${period.toLowerCase()} contribution plus the pre-loan service charge.`,
        }}
      />
      {(breakdown.tenureYears || breakdown.numberOfInstallments) && (
        <TextField
          label="Tenure"
          value={`${breakdown.tenureYears} years (${breakdown.numberOfInstallments} installments)`}
          readOnly
          info={{ title: "Tenure", content: "The eventual loan's repayment length." }}
        />
      )}
      {!!breakdown.numberOfCyclesToCompleteEquity && (
        <TextField
          label="Cycles to Complete Equity"
          value={`${breakdown.numberOfCyclesToCompleteEquity} cycles`}
          readOnly
          info={{
            title: "Cycles to Complete Equity",
            content: "How many payments, at your intended contribution amount, to finish your equity.",
          }}
        />
      )}
      <TextField
        label="Total Repayment"
        value={naira(breakdown.totalRepayment)}
        readOnly
        info={{
          title: "Total Repayment",
          content:
            "Total Fees = Eligible Loan + Loan Management Fee. Post-Loan Charge (0.05%) = 0.05% of Total Fees * 48. Total repayment = Total Fees + Post-Loan Charges.",
        }}
      />
      <TextField
        label={`Post-Loan Weekly Repayment over ${years} years`}
        value={naira(breakdown.postLoanWeeklyContribution)}
        readOnly
        info={{
          title: `Post-Loan Weekly Repayment over ${years} years`,
          content: `Total Fees = Eligible Loan + Loan Management Fee. Post-Loan Charge (0.05%) = 0.05% of Total Fees. Total to Repay Over ${years} Years = Total Fees + Post-Loan Charges. Weekly Repayment = Total Repayment ÷ ${years * 52} weeks`,
        }}
      />
      {onReferralCodeChange && (
        <TextField
          label="Referral Code (Optional)"
          placeholder="Enter Your Referral Code"
          value={referralCode ?? ""}
          onValueChange={onReferralCodeChange}
        />
      )}
    </div>
  );
}
