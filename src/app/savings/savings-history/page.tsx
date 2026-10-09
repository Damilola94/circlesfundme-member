import { BackButton } from "@/components/layout/screen";
import { SavingsHistory } from "@/components/history/savings-history";

export default function SavingsHistoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-12 pb-8">
      <BackButton />
      <SavingsHistory />
    </div>
  );
}
