import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function LoanApplicationSuccessPage() {
  return (
    <div className="flex flex-1 flex-col justify-center px-4 pb-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <CircleCheck className="size-[172px] text-brand" strokeWidth={2.2} aria-hidden />
        <h1 className="mt-6 text-[28px] font-medium">Application Successful</h1>
        <p className="text-base text-muted-foreground">Congratulations, your loan has been submitted</p>
      </div>
      <Link href="/dashboard" replace className={buttonVariants({ size: "cta", className: "mt-20" })}>
        Back to Dashboard
      </Link>
    </div>
  );
}
