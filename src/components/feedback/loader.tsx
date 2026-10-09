import { LogoMark } from "@/components/brand/logo-mark";

/** Full-screen blocking loader (the mobile app's <Loader message="..." />). */
export function Loader({ message = "Loading..." }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-background/85 backdrop-blur-[2px]"
    >
      <LogoMark color="var(--brand)" dotColor="#f4ce14" spin className="h-[100px] w-auto" />
      <p className="text-base text-muted-foreground">{message}</p>
    </div>
  );
}

/** Non-blocking inline spinner for sections that load inside a page. */
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-10">
      <LogoMark color="var(--brand)" dotColor="#f4ce14" spin className="h-12 w-auto" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
