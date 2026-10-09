import { BulkPaymentScreen } from "@/components/payments/bulk-payment";

export default function BulkLoanRepaymentPage() {
  return (
    <BulkPaymentScreen
      title="Bulk Loan Repayment"
      queryKey="loan-repayments"
      list={{ endpoint: "loanapplications", extra: "my-loan-repayments", statusParam: "status" }}
      payExtra="bulk-loan-repayment"
      loadingMessage="Loading loan repayments..."
      emptyMessage="You have no unpaid loan repayments 🎉"
    />
  );
}
