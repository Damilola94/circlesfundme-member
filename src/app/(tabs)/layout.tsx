import { BottomNav } from "@/components/layout/bottom-nav";

export default function TabsLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <div className="flex flex-1 flex-col px-4 pt-12 pb-6">{children}</div>
      <BottomNav />
    </div>
  );
}
