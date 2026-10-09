import { toast } from "sonner";

// Same call shape as the mobile app's Toast.show({ type, text1, text2 }).
export function showToast({ type, text1, text2 }: { type: "success" | "error" | "info"; text1: string; text2?: string }) {
  toast[type](text1, text2 ? { description: text2 } : undefined);
}
