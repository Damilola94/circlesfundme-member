"use client";

/**
 * Hand-off to the external payment page (Paystack authorization URL).
 *
 * The mobile app embedded the page in a WebView and watched its URL for "success"/"callback".
 * Browsers can't observe a cross-origin page, so on the web we open it in a popup and
 * confirm the payment by checking whether the relevant balance changed.
 */
export type CheckoutIntent = {
  url: string;
  reference?: string;
  title?: string;
  /** What to compare before/after to detect a completed payment. */
  verify:
    | { type: "contribution" }
    | { type: "plan"; planId: string }
    /** Number of unpaid items at an endpoint (bulk contribution / loan repayment). */
    | { type: "unpaid"; endpoint: string; extra: string; pQuery: Record<string, string | number> };
  /** Where to go once the payment is confirmed. */
  successHref: string;
  successMessage?: string;
  /** Where "Cancel" goes (defaults to history back). */
  cancelHref?: string;
};

const KEY = "cfm_checkout_intent";

export function saveCheckout(intent: CheckoutIntent) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(intent));
  } catch {}
}

export function loadCheckout(): CheckoutIntent | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CheckoutIntent) : null;
  } catch {
    return null;
  }
}

export function clearCheckout() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
