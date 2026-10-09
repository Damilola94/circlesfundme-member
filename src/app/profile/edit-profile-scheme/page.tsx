"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { toNumber } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { FormScreen } from "@/components/layout/screen";
import { useContributionSchemeForm } from "@/components/schemes/contribution-scheme-form";

export default function EditSchemePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useContributionSchemeForm({ withEquity: false, withReferral: false });

  const switchScheme = useMutation({
    mutationFn: (body: object) => api({ endpoint: "users/switch-contribution-scheme", method: "POST", body }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Switch Failed", text2: res?.message || "Try again" });
        return;
      }
      showToast({ type: "success", text1: "Scheme Updated Successfully" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      queryClient.invalidateQueries({ queryKey: ["financials-my-wallets"] });
      router.back();
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  function save() {
    const values = form.validate();
    if (!values) return;
    switchScheme.mutate({
      newContributionSchemeId: values.schemeId,
      contributionAmount: toNumber(values.contribution),
      ...(values.isVehicle ? { costOfVehicle: values.costOfVehicle } : { income: toNumber(values.income) }),
      weekDay: values.weekDay,
      monthDay: values.monthDay,
      walletPolicy: "Keep",
      reason: "Which to upgrade",
    });
  }

  if (form.schemesLoading) return <Loader />;

  return (
    <FormScreen
      title="Edit Scheme"
      footer={
        <Button size="cta" onClick={save} disabled={switchScheme.isPending}>
          {switchScheme.isPending ? "Saving..." : "Save Changes"}
        </Button>
      }
    >
      {switchScheme.isPending && <Loader message="Updating scheme..." />}
      {form.fields}
    </FormScreen>
  );
}
