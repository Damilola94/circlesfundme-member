"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, ShieldCheck } from "lucide-react";

import { api } from "@/lib/api/client";
import type { WalletItem } from "@/lib/api/types";
import { showToast } from "@/lib/toast";
import { clearCheckout, loadCheckout, type CheckoutIntent } from "@/lib/checkout";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/screen";
import { LogoMark } from "@/components/brand/logo-mark";

const POLL_MS = 5000;

async function snapshot(intent: CheckoutIntent): Promise<string | null> {
  if (intent.verify.type === "contribution") {
    const res = await api<WalletItem[]>({ endpoint: "financials/my-wallets" });
    return res.data?.find((w) => w.title === "Your contribution")?.balance ?? null;
  }
  if (intent.verify.type === "unpaid") {
    const { endpoint, extra, pQuery } = intent.verify;
    const res = await api<unknown[]>({ endpoint, extra, pQuery });
    return String(res.data?.length ?? 0);
  }
  if (intent.verify.type === "plan") {
    const res = await api<{ balance: number }>({ endpoint: `savings/plans/${intent.verify.planId}` });
    return res.data?.balance != null ? String(res.data.balance) : null;
  }
  return null;
}

type Phase = "ready" | "waiting" | "unconfirmed";

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [intent] = useState(loadCheckout);
  const [phase, setPhase] = useState<Phase>("ready");
  const [checking, setChecking] = useState(false);
  const baseline = useRef<string | null | undefined>(undefined);
  const popup = useRef<Window | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!intent) {
      router.replace("/dashboard");
      return;
    }
    snapshot(intent)
      .then((v) => (baseline.current = v))
      .catch(() => (baseline.current = null));
  }, [intent, router]);

  const succeed = useCallback(async () => {
    if (!intent || done.current) return;
    done.current = true;
    popup.current?.close();
    clearCheckout();
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["financials-my-wallets"] }),
      queryClient.invalidateQueries({ queryKey: ["users-me"] }),
      queryClient.invalidateQueries({ queryKey: ["savings-plan-detail"] }),
      queryClient.invalidateQueries({ queryKey: ["savings-plans"] }),
      queryClient.invalidateQueries({ queryKey: ["users-unpaid-contributions"] }),
      queryClient.invalidateQueries({ queryKey: ["loan-repayments"] }),
    ]);
    showToast({ type: "success", text1: intent.successMessage ?? "Payment Successful" });
    router.replace(intent.successHref);
  }, [intent, queryClient, router]);

  /** True when the balance moved since we opened the payment page. */
  const confirmed = useCallback(async () => {
    if (!intent) return false;
    try {
      const now = await snapshot(intent);
      return baseline.current !== undefined && now !== baseline.current;
    } catch {
      return false;
    }
  }, [intent]);

  const check = useCallback(async () => {
    setChecking(true);
    const ok = await confirmed();
    setChecking(false);
    if (ok) await succeed();
    else setPhase("unconfirmed");
  }, [confirmed, succeed]);

  // While the payment window is open: poll for the balance change and notice when it closes.
  useEffect(() => {
    if (phase !== "waiting") return;
    const closedTimer = setInterval(() => {
      if (popup.current?.closed) {
        clearInterval(closedTimer);
        void check();
      }
    }, 800);
    const pollTimer = setInterval(async () => {
      if (await confirmed()) void succeed();
    }, POLL_MS);
    return () => {
      clearInterval(closedTimer);
      clearInterval(pollTimer);
    };
  }, [phase, check, confirmed, succeed]);

  function openPayment() {
    if (!intent) return;
    const w = window.open(intent.url, "cfm-checkout", "popup,width=480,height=760");
    if (!w) {
      // Popup blocked: fall back to a new tab via a normal link click.
      window.location.assign(intent.url);
      return;
    }
    popup.current = w;
    setPhase("waiting");
  }

  function cancel() {
    popup.current?.close();
    clearCheckout();
    if (intent?.cancelHref) router.replace(intent.cancelHref);
    else router.back();
  }

  if (!intent) return null;

  return (
    <div className="flex flex-1 flex-col px-4 pt-12 pb-8">
      <PageHeader title={intent.title ?? "Complete Payment"} />

      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        {phase === "waiting" ? (
          <>
            <LogoMark color="var(--brand)" dotColor="#f4ce14" spin className="h-[90px] w-auto" />
            <h2 className="text-2xl font-medium">Waiting for payment…</h2>
            <p className="max-w-[320px] text-base text-muted-foreground">
              Complete the payment in the window that opened. This page updates automatically once it’s confirmed.
            </p>
          </>
        ) : phase === "unconfirmed" ? (
          <>
            <ShieldCheck className="size-20 text-[#999]" strokeWidth={1.6} />
            <h2 className="text-2xl font-medium">We haven’t confirmed your payment yet</h2>
            <p className="max-w-[320px] text-base text-muted-foreground">
              If you completed it, it can take a moment to reflect. Check again, or reopen the payment page.
            </p>
          </>
        ) : (
          <>
            <ShieldCheck className="size-20 text-brand" strokeWidth={1.6} />
            <h2 className="text-2xl font-medium">Secure payment</h2>
            <p className="max-w-[320px] text-base text-muted-foreground">
              You’ll be taken to our payment partner to complete this payment securely.
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {phase === "ready" && (
          <Button size="cta" onClick={openPayment}>
            Continue to payment <ExternalLink className="size-4" />
          </Button>
        )}
        {phase !== "ready" && (
          <>
            <Button size="cta" onClick={check} disabled={checking}>
              {checking ? "Checking..." : "I’ve completed payment"}
            </Button>
            <Button size="cta" variant="outline" className="border-[#d9d9d9] bg-white" onClick={openPayment}>
              Reopen payment page
            </Button>
          </>
        )}
        <button type="button" onClick={cancel} className="py-2 text-base font-medium text-brand">
          Cancel
        </button>
      </div>
    </div>
  );
}
