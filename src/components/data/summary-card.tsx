import { cn } from "@/lib/utils";

export type SummaryRow = {
  label: React.ReactNode;
  hint?: React.ReactNode;
  value: React.ReactNode;
  emphasis?: boolean;
  muted?: boolean;
};

/** White rounded box of label/value rows (breakdowns, projections, loan details). */
export function SummaryCard({ rows, className }: { rows: SummaryRow[]; className?: string }) {
  return (
    <dl className={cn("flex flex-col gap-4 rounded-3xl bg-white p-5", className)}>
      {rows.map((row, i) => (
        <div key={i} className="flex items-start justify-between gap-4">
          <dt className={cn("text-sm", row.muted ? "text-muted-foreground" : "text-foreground")}>
            {row.label}
            {row.hint && <span className="mt-0.5 block text-xs text-muted-foreground">{row.hint}</span>}
          </dt>
          <dd
            className={cn(
              "text-right text-sm font-medium",
              row.emphasis && "text-brand",
              row.muted && "font-normal text-muted-foreground"
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
