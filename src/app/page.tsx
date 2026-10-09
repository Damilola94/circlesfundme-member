import { redirect } from "next/navigation";

// src/proxy.ts routes "/" based on the session; this is only a fallback.
export default function Index() {
  redirect("/sign-in/login");
}
