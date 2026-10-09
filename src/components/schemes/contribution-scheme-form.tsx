"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { CONTRIBUTION_SCHEMES, monthDayValue, toNumber } from "@/lib/schemes";
import { useDebounce } from "@/hooks/use-debounce";
import { SelectField, TextField } from "@/components/forms/field";
import {
  EquityPercentPicker,
  RegularBreakdownSummary,
  RemittanceDayField,
  VehicleBreakdownFields,
  type RegularBreakdown,
  type VehicleBreakdown,
  type VehicleKind,
} from "@/components/schemes/breakdowns";

type SchemeMini = { id: string; name: string; type: string };

export type ContributionSchemeValues = {
  schemeId: string;
  isVehicle: boolean;
  income: string;
  contribution: string;
  costOfVehicle: number;
  weekDay: string;
  monthDay: string;
  referralCode: string;
  equityPercent: number;
};

/**
 * "Full Scheme" contribution form shared by onboarding and Edit Scheme:
 * scheme picker, income/contribution or vehicle cost, live breakdowns, remittance day and validation.
 */
export function useContributionSchemeForm({ withEquity, withReferral }: { withEquity: boolean; withReferral: boolean }) {
  const [scheme, setRawScheme] = useState("");
  const [income, setRawIncome] = useState("");
  const [contribution, setRawContribution] = useState("");
  const [assetCost, setRawAssetCost] = useState("");
  const [intendedContribution, setRawIntendedContribution] = useState("");
  const [remittanceType, setRawRemittanceType] = useState("");
  const [weekDay, setRawWeekDay] = useState("");
  const [monthDay, setRawMonthDay] = useState("");
  const [referralCode, setRawReferralCode] = useState("");
  const [equityPercent, setRawEquityPercent] = useState(10);
  const [regularEquityPercent, setRawRegularEquityPercent] = useState(10);
  const [vehicle, setVehicle] = useState<VehicleBreakdown | null>(null);
  const [vehicleError, setVehicleError] = useState<string | null>(null);
  const [regular, setRegular] = useState<RegularBreakdown | null>(null);
  const [error, setError] = useState("");
  /** Editing any field clears the last validation error. */
  function clearing<T>(set: (v: T) => void) {
    return (v: T) => {
      setError("");
      set(v);
    };
  }
  const setScheme = clearing(setRawScheme);
  const setIncome = clearing(setRawIncome);
  const setContribution = clearing(setRawContribution);
  const setAssetCost = clearing(setRawAssetCost);
  const setIntendedContribution = clearing(setRawIntendedContribution);
  const setRemittanceType = clearing(setRawRemittanceType);
  const setWeekDay = clearing(setRawWeekDay);
  const setMonthDay = clearing(setRawMonthDay);
  const setReferralCode = clearing(setRawReferralCode);
  const setEquityPercent = clearing(setRawEquityPercent);
  const setRegularEquityPercent = clearing(setRawRegularEquityPercent);

  const vehicleKind: VehicleKind | null =
    scheme === "Auto Financing" ? "auto" : scheme === "Tricycle Financing" ? "tricycle" : null;
  const isRegular = !!scheme && !vehicleKind;
  const incomeValue = toNumber(income);
  const contributionValue = toNumber(contribution);
  const maxPercentage = scheme === "Weekly Contribution Scheme" ? 0.2 : 0.3;
  const isValidContribution = contributionValue <= maxPercentage * incomeValue;

  const debouncedAssetCost = useDebounce(assetCost, 1000);
  const debouncedContribution = useDebounce(contributionValue, 1000);
  const debouncedIntended = useDebounce(intendedContribution, 1000);

  const schemesQuery = useQuery({
    queryKey: ["contribution-schemes"],
    queryFn: () => api<SchemeMini[]>({ endpoint: "contributionschemes/mini" }),
    gcTime: 15 * 60 * 1000,
  });
  const schemeId = useMemo(
    () => (scheme ? schemesQuery.data?.data?.find((s) => s.name.toLowerCase().includes(scheme.toLowerCase()))?.id ?? "" : ""),
    [schemesQuery.data, scheme]
  );

  // Pre-loan charge and base contribution come back monthly; scale them to the remittance period.
  const periodDivisor = remittanceType === "Weekly" ? 4 : remittanceType === "Daily" ? 28 : 1;
  const minContribution = vehicle ? toNumber(vehicle.baseContributionAmount) / periodDivisor : 0;
  const preLoanCharge = vehicle ? toNumber(vehicle.preLoanServiceCharge) / periodDivisor : 0;
  const totalContribution = toNumber(intendedContribution) + preLoanCharge;
  const isIntendedTooLow = !!debouncedIntended.trim() && toNumber(debouncedIntended) < minContribution;

  const vehicleMutation = useMutation({
    mutationFn: (body: object) =>
      api<VehicleBreakdown>({
        endpoint:
          vehicleKind === "tricycle" ? "contributionschemes/tricycle-finance-breakdown" : "contributionschemes/auto-finance-breakdown",
        method: "POST",
        body,
        returnErrorData: true,
      }),
    onSuccess: (res) => {
      if (!res?.isSuccess) {
        setVehicle(null);
        setVehicleError(res?.message || "Failed to fetch breakdown");
        return;
      }
      setVehicle(res.data);
      setVehicleError(null);
    },
    onError: (err: Error) => setVehicleError(err.message),
  });
  const { mutate: fetchVehicle } = vehicleMutation;

  const regularMutation = useMutation({
    mutationFn: (body: object) =>
      api<RegularBreakdown>({ endpoint: "contributionschemes/regular-finance-breakdown", method: "POST", body }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Failed to fetch breakdown", text2: res?.message || "Try again later" });
        return;
      }
      setRegular(res.data);
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Breakdown Error", text2: err.message || "Something went wrong" }),
  });
  const { mutate: fetchRegular } = regularMutation;

  useEffect(() => {
    if (!vehicleKind) return;
    const cost = toNumber(debouncedAssetCost);
    if (cost <= 0) return;
    const intended = toNumber(debouncedIntended);
    fetchVehicle({
      costOfVehicle: cost,
      ...(withEquity && { equityPercent }),
      ...(withEquity && intended > 0 && { contributionAmount: intended }),
    });
  }, [vehicleKind, debouncedAssetCost, equityPercent, debouncedIntended, fetchVehicle, withEquity]);

  useEffect(() => {
    if (!isRegular || debouncedContribution <= 0 || !schemeId) return;
    fetchRegular({
      contributionSchemeId: schemeId,
      amount: debouncedContribution,
      ...(withEquity && { equityPercent: regularEquityPercent }),
    });
  }, [isRegular, debouncedContribution, schemeId, regularEquityPercent, fetchRegular, withEquity]);


  /** Returns the values to submit, or null after showing the first validation error. */
  function validate(): ContributionSchemeValues | null {
    const fail = (message: string) => {
      setError(message);
      return null;
    };
    if (!scheme) return fail("Please select a contribution scheme.");

    if (vehicleKind) {
      if (!assetCost) return fail("Please enter the cost of the vehicle.");
      if (vehicleError) return fail(vehicleError);
      if (!remittanceType) return fail("Please select a remittance type.");
      if (!intendedContribution.trim()) {
        return fail(withEquity ? `Please enter your contribution toward the ${equityPercent}% equity.` : "Please enter your contribution amount.");
      }
      if (isIntendedTooLow) return fail(`Amount must be ₦${Math.ceil(minContribution).toLocaleString()} or more.`);
      if (remittanceType === "Weekly" && !weekDay) return fail("Please select your weekly remittance day.");
      if (remittanceType === "Monthly" && !monthDay) return fail("Please select your monthly remittance day.");
    } else {
      if (!income || !contribution) return fail("Please fill in your income and preferred contribution.");
      if (!isValidContribution) return fail(`You cannot contribute more than ${maxPercentage * 100}% of your income.`);
      const min = scheme === "Daily Contribution Scheme" ? 1000 : scheme === "Weekly Contribution Scheme" ? 5000 : 10000;
      if (contributionValue < min) return fail(`Contribution amount must be at least ₦${min.toLocaleString()}.`);
      if (scheme === "Weekly Contribution Scheme" && !weekDay) return fail("Please select your remittance day.");
      if (scheme === "Monthly Contribution Scheme" && !monthDay) return fail("Please select your remittance day.");
    }

    const isDaily = vehicleKind ? remittanceType === "Daily" : scheme === "Daily Contribution Scheme";
    return {
      schemeId,
      isVehicle: !!vehicleKind,
      income,
      contribution: vehicleKind ? intendedContribution : contribution,
      costOfVehicle: vehicleKind ? toNumber(assetCost) : 0,
      weekDay: isDaily ? "" : weekDay,
      monthDay: isDaily ? "" : monthDayValue(monthDay),
      referralCode: referralCode.trim(),
      equityPercent: vehicleKind ? equityPercent : regularEquityPercent,
    };
  }

  const period = scheme === "Weekly Contribution Scheme" ? "weekly" : scheme === "Daily Contribution Scheme" ? "daily" : "monthly";
  const incomeLabel =
    scheme === "Weekly Contribution Scheme"
      ? "Weekly Sales Revenue"
      : scheme === "Daily Contribution Scheme"
        ? "Daily Sales Revenue"
        : "Monthly Income";

  const fields = (
    <div className="flex flex-col gap-5">
      <SelectField
        label="Contribution Scheme"
        placeholder="Select Your preferred scheme"
        options={CONTRIBUTION_SCHEMES}
        value={scheme}
        onSelect={(v) => {
          setScheme(v);
          setVehicle(null);
          setRegular(null);
          setVehicleError(null);
        }}
      />

      {vehicleKind && (
        <>
          <TextField
            label={`What is the cost of the ${vehicleKind === "auto" ? "vehicle" : "Tricycle"}?`}
            placeholder="Enter Amount"
            valueType="money"
            value={assetCost}
            onValueChange={setAssetCost}
            error={vehicleError ?? undefined}
          />
          {withEquity && <EquityPercentPicker value={equityPercent} onChange={setEquityPercent} />}
          {vehicleMutation.isPending && <p className="text-sm text-muted-foreground">Calculating breakdown...</p>}
          {vehicle && debouncedAssetCost.trim() && (
            <VehicleBreakdownFields
              kind={vehicleKind}
              breakdown={vehicle}
              equityPercent={equityPercent}
              remittanceType={remittanceType}
              onRemittanceTypeChange={(v) => {
                setRemittanceType(v);
                setWeekDay("");
                setMonthDay("");
              }}
              weekDay={weekDay}
              onWeekDayChange={setWeekDay}
              monthDay={monthDay}
              onMonthDayChange={setMonthDay}
              preLoanCharge={preLoanCharge}
              minContribution={minContribution}
              intendedContribution={intendedContribution}
              onIntendedContributionChange={setIntendedContribution}
              isIntendedTooLow={isIntendedTooLow}
              totalContribution={totalContribution}
              referralCode={withReferral ? referralCode : undefined}
              onReferralCodeChange={withReferral ? setReferralCode : undefined}
            />
          )}
        </>
      )}

      {isRegular && (
        <>
          <TextField label={`What's your ${incomeLabel} (NGN)?`} placeholder="Enter Amount" valueType="money" value={income} onValueChange={setIncome} />
          <TextField
            label={`What's your preferred ${period} contribution`}
            placeholder="Enter Amount"
            valueType="money"
            value={contribution}
            onValueChange={setContribution}
            error={contribution && !isValidContribution ? `You cannot contribute more than ${maxPercentage * 100}% of your income.` : undefined}
          />
          {isValidContribution && !!contribution && (
            <>
              {withEquity && <EquityPercentPicker value={regularEquityPercent} onChange={setRegularEquityPercent} />}
              {regularMutation.isPending && <p className="text-sm text-muted-foreground">Calculating breakdown...</p>}
              {regular && <RegularBreakdownSummary breakdown={regular} scheme={scheme} equityPercent={regularEquityPercent} />}
              {scheme !== "Daily Contribution Scheme" && (
                <RemittanceDayField
                  period={scheme === "Weekly Contribution Scheme" ? "Weekly" : "Monthly"}
                  weekDay={weekDay}
                  onWeekDayChange={setWeekDay}
                  monthDay={monthDay}
                  onMonthDayChange={setMonthDay}
                />
              )}
              {withReferral && (
                <TextField label="Referral Code (Optional)" placeholder="Enter Your Referral Code" value={referralCode} onValueChange={setReferralCode} />
              )}
            </>
          )}
        </>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );

  return { fields, validate, schemesLoading: schemesQuery.isLoading };
}
