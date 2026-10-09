"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";

import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { saveCheckout } from "@/lib/checkout";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { PageHeader, StepProgress } from "@/components/layout/screen";
import { OptionRows } from "@/components/forms/option-card";

export default function PaymentMethodPage() {
  const router = useRouter();
  const { data: user } = useUser();
  const [selected, setSelected] = useState<string | null>("Card");

  // A linked card means step 1 is already done.
  useEffect(() => {
    if (user?.isCardLinked) router.replace("/payment-setup/withdraw-setup");
  }, [user?.isCardLinked, router]);

  const init = useMutation({
    mutationFn: () =>
      api<{ authorizationUrl?: string; reference?: string }>({
        endpoint: "financials/make-initial-contribution",
        method: "POST",
        body: {},
      }),
    onSuccess: (res) => {
      if (res?.statusCode !== "200" || !res.data?.authorizationUrl) {
        showToast({ type: "error", text1: "Payment initiation failed", text2: res?.message || "Try again" });
        return;
      }
      saveCheckout({
        url: res.data.authorizationUrl,
        reference: res.data.reference,
        title: "Card",
        verify: { type: "contribution" },
        successHref: "/payment-setup/withdraw-setup",
        successMessage: "Card linked successfully",
      });
      router.push("/checkout");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" }),
  });

  function handleContinue() {
    if (user?.isCardLinked) return router.push("/payment-setup/withdraw-setup");
    init.mutate();
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {init.isPending && <Loader message="Loading..." />}
      <main className="flex flex-1 flex-col px-4 pt-12">
        <PageHeader title="Payment method" />
        <div className="mt-8">
          <StepProgress total={2} current={1} />
        </div>
        <h2 className="mt-10 text-[32px] font-medium">Funding</h2>
        <div className="mt-8">
          <OptionRows
            options={[{ value: "Card", label: "Card", icon: <CreditCard className="size-5" /> }]}
            value={selected}
            onValueChange={setSelected}
          />
        </div>
      </main>
      <div className="sticky bottom-0 bg-background px-4 pt-3 pb-8">
        <Button size="cta" onClick={handleContinue} disabled={init.isPending}>
          {init.isPending ? "Loading..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
