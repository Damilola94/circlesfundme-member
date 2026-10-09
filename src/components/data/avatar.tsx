/* eslint-disable @next/next/no-img-element -- profile photos come from the backend's storage, on arbitrary hosts */
import { cn } from "@/lib/utils";

const FALLBACK = "/images/man-avatar.jpeg";

export function Avatar({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
  return (
    <img
      src={src?.trim() ? src : FALLBACK}
      alt={alt}
      className={cn("shrink-0 rounded-full bg-muted object-cover", className)}
    />
  );
}
