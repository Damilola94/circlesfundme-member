"use client";

import { cn } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

/** Digit boxes for one-time codes; supports paste and SMS autofill. */
export function OtpInput({
  value,
  onChange,
  length = 6,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
}) {
  return (
    <InputOTP
      maxLength={length}
      value={value}
      onChange={onChange}
      inputMode="numeric"
      pattern="^[0-9]*$"
      autoComplete="one-time-code"
      autoFocus
    >
      <InputOTPGroup className="w-full justify-between gap-2">
        {Array.from({ length }, (_, i) => (
          <InputOTPSlot
            key={i}
            index={i}
            className={cn(
              "h-16 flex-1 rounded-2xl border border-transparent bg-white text-3xl first:rounded-l-2xl first:border-l last:rounded-r-2xl",
              "data-[active=true]:border-brand/50 data-[active=true]:ring-0",
              i < value.length && "border-brand/50",
              error && "border-destructive"
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

/** "Didn't get an OTP? Resend in 30s" line. */
export function ResendLine({ seconds, onResend }: { seconds: number; onResend: () => void }) {
  return (
    <p className="text-center text-base text-muted-foreground">
      Didn’t get an OTP?{" "}
      {seconds > 0 ? (
        <span className="font-medium text-brand">Resend in {seconds}s</span>
      ) : (
        <button type="button" onClick={onResend} className="font-medium text-brand">
          Resend OTP
        </button>
      )}
    </p>
  );
}
