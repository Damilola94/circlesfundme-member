"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { saveCheckout } from "@/lib/checkout";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { PageHeader } from "@/components/layout/screen";
import { parseServerDate } from "@/components/dashboard/widgets";

type Installment = {
  id: string;
  amount: number;
  charges: number;
  amountIncludingCharges: number;
  dueDate: string;
};

function Tick({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-md border",
        checked ? "border-brand bg-brand text-white" : "border-brand bg-white"
      )}
    >
      {checked && <Check className="size-3.5" strokeWidth={3} />}
    </span>
  );
}

/**
 * Select unpaid installments and pay them in one go
 * (contribution-bank-payment and loan-bank-payment in the mobile app).
 */
export function BulkPaymentScreen({
  title,
  queryKey,
  list,
  payExtra,
  loadingMessage,
  emptyMessage,
}: {
  title: string;
  queryKey: string;
  list: { endpoint: string; extra: string; statusParam: "Status" | "status" };
  payExtra: string;
  loadingMessage: string;
  emptyMessage: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const pQuery = { pageSize: 1000, [list.statusParam]: "Unpaid" };

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => api<Installment[]>({ endpoint: list.endpoint, extra: list.extra, pQuery }),
  });
  const items = useMemo(() => data?.data ?? [], [data]);
  const allSelected = items.length > 0 && selected.length === items.length;
  const total = useMemo(
    () => items.filter((i) => selected.includes(i.id)).reduce((sum, i) => sum + i.amountIncludingCharges, 0),
    [items, selected]
  );

  const pay = useMutation({
    mutationFn: () =>
      api<{ authorizationUrl?: string; reference?: string }>({
        endpoint: "financials",
        extra: payExtra,
        method: "POST",
        body: { amount: total, paymentMethod: "bank_transfer" },
      }),
    onSuccess: (res) => {
      if (!res?.isSuccess || !res.data?.authorizationUrl) {
        showToast({ type: "error", text1: "Payment failed", text2: res?.message || "Try again" });
        return;
      }
      saveCheckout({
        url: res.data.authorizationUrl,
        reference: res.data.reference,
        title,
        verify: { type: "unpaid", endpoint: list.endpoint, extra: list.extra, pQuery },
        successHref: "/dashboard",
        successMessage: "Payment Successful",
      });
      router.push("/checkout");
    },
    onError: (e: Error) => showToast({ type: "error", text1: "Error", text2: e.message || "Something went wrong" }),
  });

  if (isLoading) return <Loader message={loadingMessage} />;

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {pay.isPending && <Loader />}
      <main className="flex flex-1 flex-col gap-4 px-4 pt-12 pb-4">
        <PageHeader title={title} />
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected(allSelected ? [] : items.map((i) => i.id))}
            className="mt-4 flex items-center gap-3 text-base"
          >
            <Tick checked={allSelected} />
            Select all
            {selected.length > 0 && (
              <span className="ml-auto text-sm text-brand">
                ₦{total.toLocaleString()} ({selected.length})
              </span>
            )}
          </button>
        )}
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                setSelected((prev) => (prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]))
              }
              className={cn(
                "flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition-colors",
                isSelected ? "border-brand bg-brand-soft" : "border-transparent"
              )}
            >
              <Tick checked={isSelected} />
              <div className="flex flex-1 justify-between gap-3">
                <div>
                  <p className="text-base font-medium">₦{item.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Charges: ₦{item.charges.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-medium">₦{item.amountIncludingCharges.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {parseServerDate(item.dueDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
        {items.length === 0 && <p className="mt-16 text-center text-base text-muted-foreground">{emptyMessage}</p>}
      </main>
      <div className="sticky bottom-0 bg-background px-4 pt-3 pb-8">
        <Button size="cta" disabled={selected.length === 0 || pay.isPending} onClick={() => pay.mutate()}>
          Pay Now ₦{total.toLocaleString()}
        </Button>
      </div>
    </div>
  );
}
