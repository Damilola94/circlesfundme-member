"use client";

import { useEffect, useRef } from "react";

/** Calls `onReachEnd` when the returned sentinel element scrolls into view. */
export function useInfiniteScroll(onReachEnd: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver((entries) => entries[0]?.isIntersecting && onReachEnd(), {
      rootMargin: "200px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [onReachEnd, enabled]);
  return ref;
}
