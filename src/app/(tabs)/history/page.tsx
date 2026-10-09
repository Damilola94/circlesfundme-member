"use client";

import { useUser } from "@/hooks/use-user";
import { Loader } from "@/components/feedback/loader";
import { LoanHistory } from "@/components/history/loan-history";
import { SavingsHistory } from "@/components/history/savings-history";

export default function HistoryPage() {
  const { data: user, isLoading } = useUser();
  if (isLoading) return <Loader />;
  return user?.schemeMode === 2 ? <SavingsHistory /> : <LoanHistory />;
}
