"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import HomeIcon from "@/components/icons/home-icon";
import HomeIconOutline from "@/components/icons/home-icon-outline";
import HistoryIcon from "@/components/icons/history-icon";
import HistoryIconOutline from "@/components/icons/history-icon-outline";
import NotificationIcon from "@/components/icons/notification-icon";
import NotificationIconOutline from "@/components/icons/notification-icon-outline";
import ProfileIcon from "@/components/icons/profile-icon";
import ProfileIconOutline from "@/components/icons/profile-icon-outline";

const TABS = [
  { href: "/dashboard", label: "Dashboard", Active: HomeIcon, Inactive: HomeIconOutline },
  { href: "/history", label: "History", Active: HistoryIcon, Inactive: HistoryIconOutline },
  { href: "/notification", label: "Notifications", Active: NotificationIcon, Inactive: NotificationIconOutline },
  { href: "/profile", label: "Profile", Active: ProfileIcon, Inactive: ProfileIconOutline },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-40 border-t border-[#ececec] bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-4">
        {TABS.map(({ href, label, Active, Inactive }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-1 pt-3 pb-3"
              >
                {active ? <Active /> : <Inactive />}
                <span className={cn("text-[10px] font-semibold", active ? "text-foreground" : "text-foreground/40")}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
