"use client";

import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";

/** Slide-up sheet (the mobile app's bottom-sheet modals). */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup className="fixed bottom-0 left-1/2 z-50 flex max-h-[90dvh] w-full max-w-[430px] -translate-x-1/2 flex-col gap-5 overflow-y-auto rounded-t-[28px] bg-white px-5 pt-3 pb-8 outline-none data-open:animate-in data-open:slide-in-from-bottom data-closed:animate-out data-closed:slide-out-to-bottom">
          <span className="mx-auto h-1 w-10 rounded-full bg-[#e0e0e0]" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
              {description && (
                <DialogDescription className="mt-1 text-sm text-muted-foreground">{description}</DialogDescription>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2]"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
