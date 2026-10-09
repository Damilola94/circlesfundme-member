import { BackButton } from "@/components/layout/screen";
import { LoanHistory } from "@/components/history/loan-history";

export default function LoanHistoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-12 pb-8">
      <BackButton />
      <LoanHistory />
    </div>
  );
}
