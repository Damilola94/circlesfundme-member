"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { api, isOk, updateSession } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { clearDraft, useOnboardingDraft } from "@/lib/onboarding-draft";
import { monthDayValue, onboardingIdentity } from "@/lib/schemes";
import { Loader } from "@/components/feedback/loader";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { useSavingsPlanForm } from "@/components/schemes/savings-plan-form";

export default function SavingsSchemePage() {
  const router = useRouter();
  const [draft] = useOnboardingDraft();

  const complete = useMutation({
    mutationFn: (remittance: { type: string; weekDay: string; monthDay: string }) =>
      api({
        endpoint: "accounts/complete-onboarding",
        method: "POST",
        multipart: true,
        body: {
          ...onboardingIdentity(draft),
          WeekDay: remittance.type === "Daily" ? "" : remittance.weekDay,
          MonthDay: remittance.type === "Daily" ? "" : monthDayValue(remittance.monthDay),
          OnboardingPath: "SavingsOnly",
        },
      }),
    onSuccess: async (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Submission Failed", text2: res?.message || "Invalid data" });
        return;
      }
      showToast({ type: "success", text1: "Account Setup Complete" });
      await updateSession({ isKycComplete: true, onboardingStatus: "Completed" });
      clearDraft();
      router.replace("/dashboard");
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  const form = useSavingsPlanForm({ onPlanCreated: () => complete.mutate(form.remittance) });
  const busy = form.isSubmitting || complete.isPending;

  if (form.schemesLoading) return <Loader />;

  return (
    <OnboardingScreen
      step={7}
      title="Savings Only"
      description="Select how you want to contribute and grow your funds."
      primaryLabel={busy ? "Please wait..." : "Accept and Continue"}
      primaryDisabled={busy}
      onPrimary={form.submit}
    >
      {busy && <Loader message={complete.isPending ? "Completing setup..." : form.loaderMessage} />}
      {form.fields}
    </OnboardingScreen>
  );
}
