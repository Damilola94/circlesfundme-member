"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { useBanks } from "@/hooks/use-user";
import { SelectField, TextField } from "@/components/forms/field";

/** Resolve a bank name picked in the list to its code (same loose match as the mobile app). */
export function useBankCode(bankName: string) {
  const { data: banks = [] } = useBanks();
  const code = bankName ? banks.find((b) => b.bankName.toLowerCase().includes(bankName.toLowerCase()))?.bankCode : undefined;
  return { banks, code };
}

/** Account number + bank picker, with automatic account-name lookup once both are filled in. */
export function BankAccountFields({
  accountNumber,
  onAccountNumberChange,
  bank,
  onBankChange,
  fallbackAccountName,
}: {
  accountNumber: string;
  onAccountNumberChange: (v: string) => void;
  bank: string;
  onBankChange: (v: string) => void;
  fallbackAccountName?: string;
}) {
  const { banks, code } = useBankCode(bank);
  const ready = accountNumber.length === 10 && !!code;

  const { data, isFetching } = useQuery({
    queryKey: ["account-name-enquiry", accountNumber, code],
    queryFn: () =>
      api<string>({ endpoint: "financials/account-name-enquiry", pQuery: { AccountNumber: accountNumber, BankCode: code } }),
    enabled: ready,
    retry: false,
  });
  const accountName = (ready && data?.data) || fallbackAccountName;

  return (
    <div className="flex flex-col gap-5">
      <TextField
        label="Account Number"
        inputMode="numeric"
        maxLength={10}
        placeholder="0000000000"
        value={accountNumber}
        onValueChange={(v) => onAccountNumberChange(v.replace(/\D/g, ""))}
      />
      <SelectField
        label="Bank"
        placeholder="Select Bank"
        options={banks.map((b) => b.bankName)}
        value={bank}
        onSelect={onBankChange}
        searchable
      />
      {(isFetching || accountName) && (
        <p className="flex h-14 items-center justify-center rounded-2xl bg-brand-soft text-lg font-medium text-brand">
          {isFetching ? "Fetching account name..." : accountName}
        </p>
      )}
    </div>
  );
}
