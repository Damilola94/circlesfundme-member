import { getGreeting } from "@/lib/format";
import { Avatar } from "@/components/data/avatar";

export function UserGreeting({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={avatarUrl} alt={name} className="size-12" />
      <div>
        <p className="text-sm text-muted-foreground">{getGreeting()},</p>
        <p className="text-base font-medium">{name || "User"}</p>
      </div>
    </div>
  );
}
