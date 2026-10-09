"use client";

import { CircleAlert, CircleHelp, CircleX } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";

type Tone = "error" | "info" | "question" | "none";

const icons: Record<Exclude<Tone, "none">, React.ReactNode> = {
  error: <CircleAlert className="size-[120px] text-[#d01d1d]" strokeWidth={2.4} />,
  info: <CircleAlert className="size-[72px] text-[#4b4b4b]" strokeWidth={1.8} />,
  question: <CircleHelp className="size-[124px] text-forest" strokeWidth={2} />,
};

/**
 * The rounded white modal used throughout the app (eligibility errors,
 * confirmations, info tooltips). Rendered over a dimmed screen.
 */
export function StatusDialog({
  open,
  onOpenChange,
  tone = "error",
  title,
  description,
  children,
  closable = true,
  icon,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tone?: Tone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Actions or extra content under the copy. */
  children?: React.ReactNode;
  closable?: boolean;
  /** Overrides the tone's default icon. */
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-[398px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 overflow-y-auto rounded-[32px] bg-white px-5 pt-14 pb-8 text-center outline-none duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
        >
          {closable && (
            <DialogPrimitive.Close aria-label="Close" className="absolute top-5 right-5 text-[#4b4b4b]">
              <CircleX className="size-6" strokeWidth={1.5} />
            </DialogPrimitive.Close>
          )}
          {icon ?? (tone !== "none" && icons[tone])}
          {title && (
            <DialogTitle
              className={cn(
                "leading-snug font-medium",
                tone === "info" ? "mt-4 text-base" : "mt-2 text-2xl"
              )}
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              {description}
            </DialogDescription>
          )}
          {children}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
