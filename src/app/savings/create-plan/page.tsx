"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { PageHeader } from "@/components/layout/screen";
import { useSavingsPlanForm } from "@/components/schemes/savings-plan-form";

export default function CreatePlanPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useSavingsPlanForm({
    onPlanCreated: async (schemeId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["savings-me"] }),
        queryClient.invalidateQueries({ queryKey: ["savings-plans", schemeId] }),
        queryClient.invalidateQueries({ queryKey: ["financials-my-wallets"] }),
      ]);
      showToast({ type: "success", text1: "Savings plan created!" });
      router.back();
    },
  });

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {form.schemesLoading && <Loader message="Setting up" />}
      {form.isSubmitting && <Loader message={form.loaderMessage} />}
      <main className="flex flex-1 flex-col gap-8 px-4 pt-12 pb-4">
        <PageHeader title="Add Savings Plan" />
        {form.fields}
      </main>
      <div className="sticky bottom-0 bg-background px-4 pt-3 pb-8">
        <Button size="cta" onClick={form.submit} disabled={form.isSubmitting}>
          Save
        </Button>
      </div>
    </div>
  );
}
