"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { formatDate, formatNaira } from "@/lib/format";
import {
  LUMP_SUM,
  MONTH_DAY_LABELS,
  REMITTANCE_TYPES,
  SAVINGS_DURATION_OPTIONS,
  SAVINGS_FREQUENCY_OPTIONS,
  WEEK_DAYS,
  monthDayValue,
  toNumber,
  type ProjectionData,
  type SavingsSchemeItem,
} from "@/lib/schemes";
import { useDebounce } from "@/hooks/use-debounce";
import { SelectField, TextField } from "@/components/forms/field";
import { OptionCards } from "@/components/forms/option-card";
import { SummaryCard } from "@/components/data/summary-card";

/**
 * Savings plan form shared by onboarding ("Savings Only") and "Add Savings Plan":
 * scheme, frequency, amount, duration, remittance day, live projection,
 * and the `savings/join` → `savings/plans` submission.
 */
export function useSavingsPlanForm({ onPlanCreated }: { onPlanCreated: (schemeId: string) => void }) {
  const [schemeId, setRawSchemeId] = useState("");
  const [frequency, setRawFrequency] = useState("");
  const [amount, setRawAmount] = useState("");
  const [duration, setRawDuration] = useState("");
  const [remittanceType, setRawRemittanceType] = useState("");
  const [weekDay, setRawWeekDay] = useState("");
  const [monthDay, setRawMonthDay] = useState("");
  const [projection, setProjection] = useState<ProjectionData | null>(null);
  const [error, setError] = useState("");
  /** Editing any field clears the last validation error. */
  function clearing<T>(set: (v: T) => void) {
    return (v: T) => {
      setError("");
      set(v);
    };
  }
  const setSchemeId = clearing(setRawSchemeId);
  const setFrequency = clearing(setRawFrequency);
  const setAmount = clearing(setRawAmount);
  const setDuration = clearing(setRawDuration);
  const setRemittanceType = clearing(setRawRemittanceType);
  const setWeekDay = clearing(setRawWeekDay);
  const setMonthDay = clearing(setRawMonthDay);

  const isLumpSum = frequency === LUMP_SUM;
  const amountNum = toNumber(useDebounce(amount, 800));
  const durationMonths = SAVINGS_DURATION_OPTIONS.find((d) => d.label === duration)?.months ?? 0;

  const schemesQuery = useQuery({
    queryKey: ["savings-schemes-mini"],
    queryFn: () => api<SavingsSchemeItem[]>({ endpoint: "savings/schemes/mini" }),
    gcTime: 15 * 60 * 1000,
  });
  const schemes = useMemo(() => schemesQuery.data?.data ?? [], [schemesQuery.data]);
  const effectiveSchemeId = schemeId || (schemes.length === 1 ? schemes[0].id : "");
  const selectedScheme = schemes.find((s) => s.id === effectiveSchemeId);


  const projectionMutation = useMutation({
    mutationFn: (body: object) => api<ProjectionData>({ endpoint: "savings/schemes/projection", method: "POST", body }),
    onSuccess: (res) => setProjection(isOk(res) ? (res.data ?? null) : null),
    onError: () => setProjection(null),
  });
  const { mutate: project } = projectionMutation;

  useEffect(() => {
    if (!effectiveSchemeId || !frequency || amountNum <= 0 || durationMonths <= 0) return;
    project({
      savingsSchemeId: effectiveSchemeId,
      durationInMonths: durationMonths,
      ...(isLumpSum
        ? { lumpSumAmount: amountNum, contributionAmount: amountNum }
        : { frequency, contributionAmount: amountNum }),
    });
  }, [effectiveSchemeId, frequency, amountNum, durationMonths, isLumpSum, project]);

  const createPlan = useMutation({
    mutationFn: () =>
      api({
        endpoint: "savings/plans",
        method: "POST",
        body: {
          savingsSchemeId: effectiveSchemeId,
          name: selectedScheme?.name ?? "Savings Plan",
          frequency: remittanceType,
          contributionAmount: toNumber(amount),
          durationInMonths: durationMonths,
          ...(remittanceType === "Weekly" && weekDay && { contributionWeekDay: weekDay }),
          ...(remittanceType === "Monthly" && monthDay && { contributionMonthDay: monthDayValue(monthDay) }),
        },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Plan Creation Failed", text2: res?.message || "Try again later" });
        return;
      }
      onPlanCreated(effectiveSchemeId);
    },
    onError: (err: Error) =>
      showToast({ type: "error", text1: "Error Creating Plan", text2: err.message || "Something went wrong" }),
  });

  const join = useMutation({
    mutationFn: () => api({ endpoint: "savings/join", method: "POST", body: { savingsSchemeId: effectiveSchemeId } }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Failed to Join Scheme", text2: res?.message || "Try again later" });
        return;
      }
      createPlan.mutate();
    },
    onError: (err: Error) =>
      showToast({ type: "error", text1: "Error Joining Scheme", text2: err.message || "Something went wrong" }),
  });

  function submit() {
    if (!effectiveSchemeId) return setError("Please select a savings category.");
    if (!frequency) return setError("Please select a savings frequency.");
    if (toNumber(amount) <= 0) {
      return setError(isLumpSum ? "Please enter your preferred lump sum amount." : "Please enter your preferred savings amount.");
    }
    if (!duration) return setError("Please select a saving duration.");
    if (!remittanceType) return setError("Please select a remittance type.");
    if (remittanceType === "Weekly" && !weekDay) return setError("Please select your weekly remittance day.");
    if (remittanceType === "Monthly" && !monthDay) return setError("Please select your monthly remittance day.");
    join.mutate();
  }

  const per = isLumpSum ? " lump sum" : `/${frequency.toLowerCase() || "month"}`;

  const fields = (
    <div className="flex flex-col gap-5">
      {schemes.length > 1 && (
        <div>
          <p className="mb-4 text-base">Select Savings category</p>
          <OptionCards
            options={schemes.map((s) => ({ value: s.id, title: s.name, description: s.description }))}
            value={schemeId || null}
            onValueChange={setSchemeId}
          />
        </div>
      )}
      {schemes.length === 1 && selectedScheme && (
        <div className="rounded-2xl border border-brand bg-brand-soft p-4">
          <p className="text-base font-medium">{selectedScheme.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{selectedScheme.description}</p>
          <p className="mt-2 text-xs font-medium text-brand">{selectedScheme.interestRatePerAnnumPercent}% p.a. interest</p>
        </div>
      )}
      <SelectField label="Savings Frequency" options={SAVINGS_FREQUENCY_OPTIONS} value={frequency} onSelect={setFrequency} />
      <TextField
        label={`What's your preferred ${frequency ? (isLumpSum ? "lump sum" : frequency.toLowerCase()) : "monthly"} savings?`}
        placeholder="Enter Amount"
        valueType="money"
        value={amount}
        onValueChange={setAmount}
      />
      <SelectField
        label="Saving Duration"
        options={SAVINGS_DURATION_OPTIONS.map((d) => d.label)}
        value={duration}
        onSelect={setDuration}
      />
      <SelectField
        label="Remittance Type"
        placeholder="Choose remittance type"
        options={REMITTANCE_TYPES}
        value={remittanceType}
        onSelect={(v) => {
          setRemittanceType(v);
          setWeekDay("");
          setMonthDay("");
        }}
      />
      {remittanceType === "Weekly" && (
        <SelectField label="Remittance Day" placeholder="Choose contribution day" options={WEEK_DAYS} value={weekDay} onSelect={setWeekDay} />
      )}
      {remittanceType === "Monthly" && (
        <SelectField
          label="Remittance Day"
          placeholder="Choose contribution day"
          options={MONTH_DAY_LABELS}
          value={monthDay}
          onSelect={setMonthDay}
        />
      )}
      {projectionMutation.isPending && <p className="text-sm text-muted-foreground">Calculating...</p>}
      {projection && (
        <SummaryCard
          rows={[
            { label: "Saving Amount", value: `${formatNaira(projection.savingAmount)}${per}` },
            { label: "Total Savings", value: formatNaira(projection.totalSavings) },
            { label: "Interest Rate", value: `${projection.interestRatePerAnnumPercent}% per annum` },
            { label: "Interest Value", value: formatNaira(projection.interestValue) },
            { label: "Total Future Value", value: formatNaira(projection.totalFutureValue), emphasis: true },
            { label: "Start Date", value: formatDate(projection.commencementDate), muted: true },
            { label: "Maturity Date", value: formatDate(projection.maturityDate), muted: true },
          ]}
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );

  return {
    fields,
    submit,
    schemesLoading: schemesQuery.isLoading,
    isSubmitting: join.isPending || createPlan.isPending,
    loaderMessage: join.isPending ? "Joining savings scheme..." : "Creating savings plan...",
    remittance: { type: remittanceType, weekDay, monthDay },
  };
}
