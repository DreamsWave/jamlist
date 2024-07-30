"use client";

import useUser from "@/hooks/useUser";
import { getDiscordMetadata } from "@/utils/discord";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcherMenuItem from "./theme-switcher-menu-item";
import LogoutMenuItem from "./logout-menu-item";
import UserAvatarButton from "./user-avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/tailwind";

function UserNav({ initials = "" }: { initials?: string }) {
  const { user } = useUser();
  const discordMetadata = getDiscordMetadata(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-8 w-8 rounded-full p-0 hover:bg-transparent",
          )}
        >
          <UserAvatarButton initials={initials} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {discordMetadata?.full_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {discordMetadata?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <ThemeSwitcherMenuItem />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutMenuItem />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
