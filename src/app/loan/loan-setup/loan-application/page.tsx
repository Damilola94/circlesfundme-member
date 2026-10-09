"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleCheck, Clock, Plus } from "lucide-react";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { formatAmount } from "@/lib/format";
import { WEEK_DAYS } from "@/lib/schemes";
import { uploadDocument } from "@/lib/upload-document";
import { useBanks, useUser, useWallets } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { InlineLoader, Loader } from "@/components/feedback/loader";
import { StatusDialog } from "@/components/feedback/status-dialog";
import { FormScreen } from "@/components/layout/screen";
import { FileChip, SelectField, TextField, UploadDropzone } from "@/components/forms/field";

const LOAN_SECURITY_OPTIONS = ["Guarantors", "Collateral", "Post-dated cheque"];
const COLLATERAL_TYPES = ["House", "Car", "Shop", "Warehouse", "Other"];
const DOC_TYPES = ["application/pdf", "image/png", "image/jpeg"];

type EligibleLoan = {
  eligibleLoan?: number;
  serviceCharge?: number;
  totalRepayment?: number;
  postLoanWeeklyContribution?: number;
};

type Cluster = {
  id: string;
  name: string;
  status: string;
  clusterCode?: string;
  acceptedMembersCount?: number;
  membersCount?: number;
};

function LoanApplication() {
  const router = useRouter();
  const clusterIdParam = useSearchParams().get("clusterId");
  const { data: user } = useUser();
  const { data: wallets = [] } = useWallets();
  const { data: banks = [] } = useBanks();
  const { data: eligibleRes } = useQuery({
    queryKey: ["users-my-eligible-loan"],
    queryFn: () => api<EligibleLoan>({ endpoint: "users/my-eligible-loan" }),
  });
  const loan = eligibleRes?.data;
  const scheme = wallets.find((w) => w.title === "Maximum Loan Eligible")?.scheme ?? "";
  const isAuto = scheme === "Auto Finance Contribution";

  const [weekDay, setWeekDay] = useState("");
  const [security, setSecurity] = useState("");
  const [collateralType, setCollateralType] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<{ documentUrl: string; documentName: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const needsDocuments = security === "Collateral" || security === "Post-dated cheque";
  const needsCollateralType = security === "Collateral";
  const needsCluster = security === "Guarantors";

  const { data: clusterRes, isLoading: checkingCluster } = useQuery({
    queryKey: ["my-cluster"],
    queryFn: () => api<Cluster | null>({ endpoint: "clusters/my-cluster" }),
    enabled: needsCluster,
  });
  const cluster = clusterRes?.data;
  // The backend reports a usable (activated) cluster as "Pending" until the loan is funded.
  const hasUsableCluster = !!cluster && cluster.status === "Pending";
  const clusterId = clusterIdParam ?? (hasUsableCluster ? cluster.id : undefined);

  const bankName = banks.find((b) => b.bankCode.toLowerCase() === user?.withdrawalSetting?.bankCode?.toLowerCase())?.bankName;

  async function handleProceed() {
    if (!weekDay) return showToast({ type: "error", text1: "Please select a remittance day" });
    if (!security) return showToast({ type: "error", text1: "Please select a loan security type" });
    if (needsCollateralType && !collateralType) return showToast({ type: "error", text1: "Please select a collateral type" });
    if (needsCluster && !clusterId) return showToast({ type: "error", text1: "Please create a cluster first" });

    if (needsDocuments && documents.length > 0) {
      try {
        setUploading(true);
        const uploaded = await Promise.all(
          documents.map(async (doc) => ({ documentUrl: await uploadDocument(doc), documentName: doc.name }))
        );
        setUploadedDocs(uploaded);
      } catch (err) {
        return showToast({ type: "error", text1: "Document upload failed", text2: (err as Error).message || "Please try again" });
      } finally {
        setUploading(false);
      }
    } else {
      setUploadedDocs([]);
    }
    setConfirming(true);
  }

  const apply = useMutation({
    mutationFn: () =>
      api({
        endpoint: "loanapplications",
        extra: "create",
        method: "POST",
        body: {
          weekDay,
          loanSecurityType: security,
          ...(needsCollateralType && { collateralType }),
          ...(clusterId && { clusterId }),
          documents: uploadedDocs,
        },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Loan Application Failed", text2: res?.message || "Something went wrong" });
        return;
      }
      showToast({ type: "success", text1: "Loan Application Submitted" });
      setConfirming(false);
      router.push("/loan/loan-setup/loan-application-success");
    },
    onError: (error: Error) => {
      setConfirming(false);
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" });
    },
  });

  const repaymentTerm =
    scheme === "Weekly Contribution Scheme"
      ? "52 Weeks"
      : scheme === "Daily Contribution Scheme"
        ? "365 Days"
        : isAuto
          ? "208 Weeks"
          : "12 Months";

  return (
    <FormScreen
      title="Loan Application"
      footer={
        <Button size="cta" onClick={handleProceed} disabled={uploading}>
          Proceed
        </Button>
      }
    >
      {(apply.isPending || uploading) && <Loader message={uploading ? "Uploading documents..." : undefined} />}
      <div className="flex flex-col gap-5">
        <TextField label="Loan Amount" value={loan?.eligibleLoan != null ? formatAmount(loan.eligibleLoan) : ""} placeholder="0.00" readOnly />
        <SelectField
          label="Remittance Day"
          placeholder="Choose a day to remit your loan repayment"
          options={WEEK_DAYS}
          value={weekDay}
          onSelect={setWeekDay}
        />
        <SelectField
          label="Loan Security"
          placeholder="Select Loan Security"
          options={LOAN_SECURITY_OPTIONS}
          value={security}
          onSelect={(v) => {
            setSecurity(v);
            setCollateralType("");
            setDocuments([]);
          }}
        />

        {needsCluster &&
          (checkingCluster ? (
            <InlineLoader message="Checking for existing cluster..." />
          ) : clusterId ? (
            <div className="flex items-start gap-3 rounded-2xl bg-brand-soft p-4 text-sm">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <p className="font-medium text-brand">Active cluster found{cluster?.name ? `: ${cluster.name}` : ""}</p>
                {cluster && (
                  <p className="text-xs text-muted-foreground">
                    {cluster.clusterCode} · {cluster.acceptedMembersCount} member{cluster.acceptedMembersCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          ) : cluster ? (
            <div className="flex items-start gap-3 rounded-2xl bg-sun-soft p-4 text-sm">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#b8860b]" />
              <div>
                <p className="font-medium">Your cluster “{cluster.name}” is pending activation</p>
                <p className="text-xs text-muted-foreground">
                  {cluster.acceptedMembersCount} of {cluster.membersCount} members accepted
                </p>
              </div>
            </div>
          ) : (
            <Link
              href="/loan/loan-setup/create-cluster"
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-dashed border-brand text-base font-medium text-brand"
            >
              <Plus className="size-4" /> Create a Cluster
            </Link>
          ))}

        {needsCollateralType && (
          <SelectField
            label="Collateral Type"
            placeholder="Select type of collateral"
            options={COLLATERAL_TYPES}
            value={collateralType}
            onSelect={setCollateralType}
          />
        )}

        {needsDocuments && (
          <div className="flex flex-col gap-3">
            <p className="text-base">Upload Relevant Documents to your collateral</p>
            <UploadDropzone
              title="Upload Document"
              accept={DOC_TYPES.join(",")}
              formats="PDF, PNG, JPEG"
              maxSizeMB={10}
              multiple
              onFiles={(files) => {
                const ok = files.filter((f) => DOC_TYPES.includes(f.type) && f.size <= 10 * 1024 * 1024);
                if (ok.length < files.length) showToast({ type: "error", text1: "Some files were skipped (PDF/PNG/JPEG up to 10MB)" });
                setDocuments((prev) => [...prev, ...ok]);
              }}
            />
            {documents.map((doc, i) => (
              <FileChip key={`${doc.name}-${i}`} file={doc} onRemove={() => setDocuments((prev) => prev.filter((_, j) => j !== i))} />
            ))}
          </div>
        )}
      </div>

      <StatusDialog open={confirming} onOpenChange={setConfirming} tone="none" className="pt-12 text-left">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl border border-[#eee] p-4">
            <span className="text-xs text-muted-foreground">Eligible Loan Amount</span>
            <span className="text-lg font-medium">{formatAmount(loan?.eligibleLoan)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-[#eee] p-4">
            <span className="text-xs text-muted-foreground">Total Amount Repayable</span>
            <span className="text-lg font-medium">{formatAmount(loan?.totalRepayment)}</span>
          </div>
        </div>
        <hr className="w-full border-[#eee]" />
        <dl className="flex w-full flex-col gap-3 text-sm">
          {[
            ["Subscription Scheme", scheme],
            ["Repayment Term", repaymentTerm],
            [
              isAuto ? "Post Loan Weekly Contribution" : "Service Charge",
              formatAmount(isAuto ? loan?.postLoanWeeklyContribution : loan?.serviceCharge),
            ],
            ["Loan Security", security],
            ...(needsCollateralType ? [["Collateral Type", collateralType]] : []),
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <hr className="w-full border-[#eee]" />
        <div className="flex w-full justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Recipient Bank Details</span>
          <span className="text-right">
            {user?.withdrawalSetting?.accountNumber}
            <br />
            {user?.withdrawalSetting?.accountName}
            <br />
            {bankName}
          </span>
        </div>
        <Button size="cta" onClick={() => apply.mutate()} disabled={apply.isPending}>
          Confirm Loan Application
        </Button>
      </StatusDialog>
    </FormScreen>
  );
}

export default function LoanApplicationPage() {
  return (
    <Suspense>
      <LoanApplication />
    </Suspense>
  );
}
