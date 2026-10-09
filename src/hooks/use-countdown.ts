"use client";

import { useEffect, useState } from "react";

/** Seconds remaining until a resend is allowed; call `restart()` after resending. */
export function useCountdown(initial: number) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  return { seconds, restart: (value = initial) => setSeconds(value) };
}
