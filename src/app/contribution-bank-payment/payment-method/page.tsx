import { BulkPaymentScreen } from "@/components/payments/bulk-payment";

export default function UnpaidContributionsPage() {
  return (
    <BulkPaymentScreen
      title="Unpaid Contributions"
      queryKey="users-unpaid-contributions"
      list={{ endpoint: "users", extra: "my-contributions", statusParam: "Status" }}
      payExtra="bulk-contribution-payment"
      loadingMessage="Loading unpaid contributions..."
      emptyMessage="You have no unpaid contributions 🎉"
    />
  );
}
