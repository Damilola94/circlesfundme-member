"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { api, isOk, updateSession } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { clearDraft, useOnboardingDraft } from "@/lib/onboarding-draft";
import { onboardingIdentity } from "@/lib/schemes";
import { Loader } from "@/components/feedback/loader";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { useContributionSchemeForm } from "@/components/schemes/contribution-scheme-form";

export default function ContributionSchemePage() {
  const router = useRouter();
  const [draft] = useOnboardingDraft();
  const form = useContributionSchemeForm({ withEquity: true, withReferral: true });

  const submit = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      api({ endpoint: "accounts/complete-onboarding", method: "POST", body, multipart: true }),
    onSuccess: async (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Submission Failed", text2: res?.message || "Invalid data" });
        return;
      }
      showToast({ type: "success", text1: "Details Submitted" });
      await updateSession({ isKycComplete: true, onboardingStatus: "Completed" });
      clearDraft();
      router.replace("/dashboard");
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  function handleContinue() {
    const values = form.validate();
    if (!values) return;
    submit.mutate({
      ...onboardingIdentity(draft),
      ContributionSchemeId: values.schemeId,
      Income: values.income,
      CostOfVehicle: values.isVehicle ? String(values.costOfVehicle) : "",
      OnboardingPath: "FullScheme",
      ContributionAmount: values.contribution,
      WeekDay: values.weekDay,
      MonthDay: values.monthDay,
      ReferrerCode: values.referralCode,
      EquityContributionPercent: String(values.equityPercent),
    });
  }

  if (form.schemesLoading) return <Loader />;

  return (
    <OnboardingScreen
      step={7}
      title="Contribution Scheme"
      description="Select how you want to contribute and grow your funds."
      primaryLabel={submit.isPending ? "Accepting..." : "Accept and Continue"}
      primaryDisabled={submit.isPending}
      onPrimary={handleContinue}
    >
      {submit.isPending && <Loader message="Submitting Details" />}
      {form.fields}
    </OnboardingScreen>
  );
}
