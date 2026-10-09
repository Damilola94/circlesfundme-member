"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";

export type CardOption = { value: string; title: string; description: string };

/** Two-up selectable cards (scheme type, savings category). */
export function OptionCards({
  options,
  value,
  onValueChange,
}: {
  options: CardOption[];
  value: string | null;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onValueChange(v as string)}
      className="grid grid-cols-2 gap-4"
    >
      {options.map((o) => (
        <Radio.Root
          key={o.value}
          value={o.value}
          className={cn(
            "relative flex min-h-[140px] flex-col items-start gap-2 rounded-2xl border bg-white p-3.5 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40",
            "border-transparent data-checked:border-brand data-checked:bg-brand-soft"
          )}
        >
          <span className="pr-6 text-base font-medium">{o.title}</span>
          <span className="text-xs leading-relaxed text-muted-foreground">{o.description}</span>
          <RadioDot />
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}

function RadioDot() {
  return (
    <span className="absolute top-3.5 right-3.5 flex size-4 items-center justify-center rounded-full border border-[#c9c9c9] in-data-checked:border-brand">
      <Radio.Indicator className="size-2.5 rounded-full bg-brand" />
    </span>
  );
}

/** Full-width list rows with a radio on the right (payment providers). */
export function OptionRows({
  options,
  value,
  onValueChange,
}: {
  options: { value: string; label: string; icon: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={(v) => onValueChange(v as string)} className="flex flex-col gap-3">
      {options.map((o) => (
        <Radio.Root
          key={o.value}
          value={o.value}
          className="flex h-16 items-center gap-4 rounded-full border border-transparent bg-white px-5 text-left text-base outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 data-checked:border-brand"
        >
          <span className="flex w-8 justify-center">{o.icon}</span>
          <span className="flex-1">{o.label}</span>
          <span className="flex size-6 items-center justify-center rounded-full border border-[#9a9a9a] in-data-checked:border-brand">
            <Radio.Indicator className="size-4 rounded-full bg-brand" />
          </span>
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
