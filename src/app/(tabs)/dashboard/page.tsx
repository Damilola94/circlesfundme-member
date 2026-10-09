"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleAlert, CircleHelp } from "lucide-react";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { formatAmount, schemeText } from "@/lib/format";
import { useBanks, useUser, useWallets } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { StatusDialog } from "@/components/feedback/status-dialog";
import { CheckboxRow, TextField } from "@/components/forms/field";
import { UserGreeting } from "@/components/dashboard/user-greeting";
import {
  CardCarousel,
  ContributionCard,
  ContributionsMadeCard,
  LoanCard,
  ReserveCard,
  SavingsCard,
  SetupNotice,
} from "@/components/dashboard/cards";
import { EligibilityTracker, EquityTopUpCard, RecentActivityList } from "@/components/dashboard/widgets";

type CardKey = "loan" | "contribution" | "reserve" | "savings";
type LoanStep = "notEligible" | "paymentIncomplete" | "loanApplication" | null;

/** Wallet amounts arrive as display strings ("₦ 1,234.00"); keep digits and the decimal point. */
const amountOf = (value?: string | number) => parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: wallets = [] } = useWallets();
  const { data: banks = [] } = useBanks();
  const isSavingsMode = user?.schemeMode === 2;

  const { data: savingsRes, isLoading: savingsLoading } = useQuery({
    queryKey: ["savings-me"],
    queryFn: () => api<{ savingsSchemeId: string; savingsScheme?: { name: string } }[]>({ endpoint: "savings/me" }),
    enabled: isSavingsMode,
  });
  const { data: loanRes } = useQuery({
    queryKey: ["has-active-loan"],
    queryFn: () => api<{ hasActiveLoan: boolean; status: string }>({ endpoint: "financials/has-active-loan" }),
  });
  const { data: eligibleRes } = useQuery({
    queryKey: ["users-my-eligible-loan"],
    queryFn: () => api<Record<string, string | number>>({ endpoint: "users/my-eligible-loan" }),
  });
  const { data: equityRes } = useQuery({
    queryKey: ["equity-top-up-status"],
    queryFn: () =>
      api<{
        equityTarget?: string;
        paidEquity?: string;
        outstandingBalance?: string;
        isEligible?: boolean;
        ineligibilityReason?: string;
        eligibleFromDate?: string;
      }>({ endpoint: "financials/equity-top-up/status" }),
    enabled: user?.schemeMode === 1,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [loanStep, setLoanStep] = useState<LoanStep>(null);
  const [statusInfo, setStatusInfo] = useState<string | null>(null);
  const [withdrawal, setWithdrawal] = useState<"withdrawal" | "withdrawalFailed" | null>(null);
  const [withdrawalMsg, setWithdrawalMsg] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [deductCharge, setDeductCharge] = useState(true);

  const findWallet = (pred: (w: (typeof wallets)[number]) => boolean) => wallets.find(pred);
  const maxLoan = findWallet((w) => w.title === "Maximum Loan Eligible");
  const contribution = findWallet((w) => w.title === "Your contribution");
  const reserveWallet = findWallet((w) => w.title === "Reserve Account");
  const lockWallet = findWallet((w) => w.scheme === "Lock Savings");
  const flexWallet = findWallet((w) => w.scheme === "Flex Savings");

  const activeLoanStatus = loanRes?.data?.hasActiveLoan ? loanRes.data.status : maxLoan?.action;
  const eligible = eligibleRes?.data;
  const equity = equityRes?.data;
  const equityTarget = amountOf(equity?.equityTarget);
  const equityProgress = equityTarget ? Math.min(amountOf(equity?.paidEquity) / equityTarget, 1) : 0;
  const showEquityTopUp = !!equity && amountOf(equity.outstandingBalance) > 0;
  const schemeStatus = user?.currentContributionScheme?.status;

  const loanStepValidation: LoanStep =
    user?.onboardingStatus === "Completed"
      ? user?.isPaymentSetupComplete
        ? "loanApplication"
        : "paymentIncomplete"
      : "notEligible";

  const bankName = banks.find((b) =>
    b.bankCode?.toLowerCase().includes(user?.withdrawalSetting?.bankCode?.toLowerCase() ?? "\u0000")
  )?.bankName;

  const schemeIdFor = (name: string) => savingsRes?.data?.find((s) => s.savingsScheme?.name === name)?.savingsSchemeId;
  const openPlans = (name: string) =>
    router.push(
      `/savings/my-savings-plans?savingsSchemeId=${encodeURIComponent(schemeIdFor(name) ?? "")}&schemeName=${encodeURIComponent(name)}`
    );

  const savingsCards = [lockWallet, flexWallet]
    .filter((w): w is NonNullable<typeof w> => !!w)
    .map((w) => ({
      key: "savings" as CardKey,
      node: <SavingsCard amount={w.balance ?? "₦ 0"} scheme={w.scheme} nextDue={w.nextTranDate} onView={() => openPlans(w.scheme)} />,
    }));

  const contributionCards = [
    {
      key: "loan" as CardKey,
      node: (
        <LoanCard
          amount={maxLoan?.balance ?? "₦ 0"}
          scheme={maxLoan?.scheme ?? ""}
          nextTranDate={maxLoan?.nextTranDate}
          loanStatus={activeLoanStatus}
          onApply={() => setLoanStep(loanStepValidation)}
          onStatusInfo={() => setStatusInfo(activeLoanStatus ?? null)}
        />
      ),
    },
    {
      key: "contribution" as CardKey,
      node: (
        <ContributionCard
          amount={contribution?.balance ?? "₦ 0"}
          scheme={contribution?.scheme ?? ""}
          nextTranDate={contribution?.nextTranDate}
          onLien={!!user?.isLien}
          onWithdraw={() => setWithdrawal("withdrawal")}
        />
      ),
    },
    ...(reserveWallet
      ? [
          {
            key: "reserve" as CardKey,
            node: <ReserveCard amount={reserveWallet.balance ?? "₦ 0"} scheme={reserveWallet.scheme ?? ""} status={schemeStatus} />,
          },
        ]
      : []),
  ];

  const cards = isSavingsMode ? savingsCards : contributionCards;
  const activeCard = cards[activeIndex]?.key;

  const withdraw = useMutation({
    mutationFn: (body: { amount: number; deductChargeFromBalance: boolean }) =>
      api({ endpoint: "financials/withdraw", method: "POST", body }),
    onSuccess: async (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Withdrawal Failed", text2: res?.message || "Unable to process withdrawal" });
        setWithdrawalMsg(res?.message || "Unable to process withdrawal");
        return setWithdrawal("withdrawalFailed");
      }
      showToast({ type: "success", text1: "Withdrawal Successful" });
      setWithdrawal(null);
      await queryClient.invalidateQueries({ queryKey: ["financials-my-wallets"] });
      router.push("/withdrawal-setup/withdrawal-application-success");
    },
    onError: (error: Error) => {
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" });
      setWithdrawalMsg(error.message || "Something went wrong");
      setWithdrawal("withdrawalFailed");
    },
  });

  const equityTopUp = useMutation({
    mutationFn: () =>
      api<{ authorizationUrl?: string }>({ endpoint: "financials/equity-top-up", method: "POST", body: { paymentMethod: "card" } }),
    onSuccess: (res) => {
      const url = res?.data?.authorizationUrl;
      if (!url) {
        showToast({ type: "error", text1: "Equity Top-Up Failed", text2: res?.message || "Unable to start payment" });
        return;
      }
      window.location.assign(url);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Equity Top-Up Failed", text2: error.message || "Something went wrong" }),
  });

  function handleWithdrawal() {
    const amount = amountOf(withdrawalAmount);
    const balance = amountOf(contribution?.balance);
    if (!amount || amount <= 0) return showToast({ type: "error", text1: "Enter a valid amount" });
    if (balance < amount) {
      return showToast({
        type: "error",
        text1: "Insufficient balance",
        text2: `You only have ₦${balance.toLocaleString()} available.`,
      });
    }
    withdraw.mutate({ amount, deductChargeFromBalance: deductCharge });
  }

  const equityCard = showEquityTopUp && (
    <EquityTopUpCard
      isEligible={!!equity?.isEligible}
      ineligibilityReason={equity?.ineligibilityReason}
      equityTarget={equity?.equityTarget}
      paidEquity={equity?.paidEquity}
      outstandingBalance={equity?.outstandingBalance}
      eligibleFromDate={equity?.eligibleFromDate}
      progress={equityProgress}
      isPending={equityTopUp.isPending}
      onTopUp={() => equityTopUp.mutate()}
    />
  );

  function activeCardSection() {
    if (activeCard === "loan" && !user?.isPaymentSetupComplete && user?.schemeMode === 1) {
      return (
        <SetupNotice
          title="You haven’t setup payments yet"
          buttonText="Complete Setup"
          onPress={() => router.push("/payment-setup/payment-method")}
        />
      );
    }
    if (activeCard === "savings" && activeIndex === 0 && !user?.withdrawalSetting) {
      return (
        <SetupNotice
          title="You haven’t setup payments yet"
          buttonText="Complete Setup"
          onPress={() => router.push("/savings/initial-top-up-initial")}
        />
      );
    }
    if (activeCard === "contribution" && user?.schemeMode === 1) {
      return (
        <div className="flex flex-col gap-4">
          {schemeStatus !== "Completed" && (
            <SetupNotice
              title="Clear your contributions balance"
              buttonText="Clear All Now"
              onPress={() => router.push("/contribution-bank-payment/payment-method")}
            />
          )}
          {equityCard}
          <ContributionsMadeCard
            amount={user?.contributionAmount}
            installmentDesc={user?.installmentDesc}
            preInstallmentDesc={user?.preInstallmentDesc}
          />
        </div>
      );
    }
    if (activeCard === "reserve") return equityCard || null;
    return null;
  }

  const isAuto = maxLoan?.scheme === "Auto Finance Contribution";
  const money = (v: unknown) => (v == null || v === "" ? "—" : formatAmount(String(v)));
  const loanRows: [string, string][] = isAuto
    ? [
        ["Total Asset Value", money(eligible?.totalAssetValue)],
        ["Down Payment (10%)", money(eligible?.downPayment)],
        ["Loan Management Fee", money(eligible?.loanManagementFee)],
        ["Processing Fee", money(eligible?.processingFee)],
        ["Total Minimum Contribution (Your 10% Equity)", money(user?.contributionAmount)],
        ["Post-loan Weekly Contribution", money(eligible?.postLoanWeeklyContribution)],
        ["Eligible Loan", money(eligible?.eligibleLoan)],
        ["Total Repayment", money(eligible?.totalRepayment)],
      ]
    : [
        ["Subscription Scheme", schemeText(maxLoan?.scheme)],
        ["Principal Loan", money(eligible?.principalLoan)],
        ["Loan Management Fee", money(eligible?.loanManagementFee)],
        [
          "Repayment Term",
          maxLoan?.scheme === "Daily Contribution" ? "365 Days" : maxLoan?.scheme === "Weekly Contribution" ? "52 Weeks" : "12 Months",
        ],
        ["Post-Loan Service Charge", money(eligible?.postLoanServiceCharge)],
        ["Total Repayment", money(eligible?.totalRepayment)],
      ];

  const statusCopy: Record<string, { title: string; body: string; color: string }> = {
    Waitlist: {
      title: "Your loan application has been waitlisted",
      body: "This means your application has been approved but is waiting to be funded.",
      color: "text-[#666]",
    },
    Active: {
      title: "Your loan is now active",
      body: "Congratulations! Your loan has been funded and is now active.",
      color: "text-brand",
    },
    Pending: {
      title: "Your loan application is under review",
      body: "We’re currently reviewing your loan application. You’ll be notified once a decision has been made.",
      color: "text-[#ffa500]",
    },
  };
  const status = statusInfo ? statusCopy[statusInfo] : undefined;

  return (
    <div className="flex flex-col gap-5">
      {(userLoading || savingsLoading) && <Loader message="Setting up..." />}
      {user && <UserGreeting name={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()} avatarUrl={user.profilePictureUrl} />}

      {cards.length > 0 && <CardCarousel cards={cards} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} />}

      {activeCard === "loan" && ["Daily", "Weekly", "Monthly"].includes(user?.contributionScheme?.type ?? "") && (
        <EligibilityTracker />
      )}
      {activeCardSection()}
      <RecentActivityList />

      {/* Apply for loan */}
      <StatusDialog
        open={loanStep === "notEligible"}
        onOpenChange={() => setLoanStep(null)}
        title="You’re not yet eligible for a Loan"
        description="To qualify for a loan, you need to complete your onboarding."
      />
      <StatusDialog
        open={loanStep === "paymentIncomplete"}
        onOpenChange={() => setLoanStep(null)}
        title="You’re yet to complete payment setup"
        description="To access loan, you need to complete your payment setup."
      >
        <Button size="cta" className="mt-4" onClick={() => router.push("/payment-setup/payment-method")}>
          Complete payment setup
        </Button>
      </StatusDialog>
      <StatusDialog open={loanStep === "loanApplication"} onOpenChange={() => setLoanStep(null)} tone="none" className="pt-12 text-left">
        <div className="w-full text-center">
          <p className="text-sm text-muted-foreground">{isAuto ? "Vehicle Cost" : "Maximum Loan Eligible"}</p>
          <p className="mt-1 text-[34px] font-medium">
            {isAuto ? money(eligible?.costOfVehicle) : money(eligible?.eligibleLoan)}
          </p>
        </div>
        <hr className="w-full border-[#eee]" />
        <dl className="flex w-full flex-col gap-4 text-sm">
          {loanRows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <hr className="w-full border-[#eee]" />
        <p className="w-full text-sm">
          By clicking ‘Proceed’, you agree to the <span className="text-brand">loan terms</span> and{" "}
          <span className="text-brand">repayment schedule</span>
        </p>
        <Button
          size="cta"
          onClick={() => {
            setLoanStep(null);
            router.push("/loan/loan-setup/loan-application");
          }}
        >
          Proceed
        </Button>
      </StatusDialog>

      {/* Loan status explainer */}
      <StatusDialog
        open={!!status}
        onOpenChange={() => setStatusInfo(null)}
        icon={<CircleAlert className={`size-20 ${status?.color ?? ""}`} strokeWidth={2} />}
        title={status?.title}
        description={status?.body}
      />

      {/* Withdraw contribution */}
      <StatusDialog
        open={withdrawal === "withdrawalFailed"}
        onOpenChange={() => setWithdrawal(null)}
        title="Withdrawal Declined"
        description={withdrawalMsg}
      />
      <StatusDialog
        open={withdrawal === "withdrawal"}
        onOpenChange={() => setWithdrawal(null)}
        icon={<CircleHelp className="size-20 text-brand" strokeWidth={2} />}
        title="Do you wish to withdraw your contribution?"
        description="Note that you will be charged ₦500 for the transaction"
      >
        {withdraw.isPending && <Loader />}
        <div className="flex w-full flex-col gap-4 text-left">
          <TextField
            label="How much do you want to withdraw?"
            placeholder="Enter Amount"
            valueType="money"
            value={withdrawalAmount}
            onValueChange={setWithdrawalAmount}
            className="border-[#e6e6e6]"
          />
          <CheckboxRow checked={deductCharge} onCheckedChange={setDeductCharge}>
            Deduct ₦500 charge from wallet balance
          </CheckboxRow>
        </div>
        <hr className="w-full border-[#eee]" />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">Recipient Bank Details</p>
          <p className="mt-1 font-medium">{user?.withdrawalSetting?.accountNumber || "N/A"}</p>
          <p>{bankName || "N/A"}</p>
          <p className="truncate">{user?.withdrawalSetting?.accountName || "N/A"}</p>
        </div>
        <Button size="cta" onClick={handleWithdrawal} disabled={withdraw.isPending}>
          Proceed
        </Button>
      </StatusDialog>
    </div>
  );
}

