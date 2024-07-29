import { createClient } from "@/utils/supabase/server";
import type { DiscordMetadata } from "@/types";
import DiscordOAuthButton from "@/features/auth-button/discord-oauth-button";
import LogoutButton from "@/features/auth-button/logout-button";
import UserAvatar from "@/features/auth-button/user-avatar";
import { cn } from "@/utils/tailwind";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { getDiscordMetadata } from "@/utils/discord";

export default async function AuthButton({
  className,
}: {
  className?: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const discordMetadata = getDiscordMetadata(user);

  return (
    <div className={cn(className)}>
      {user ? (
        <div className="flex items-center gap-4">
          <UserAvatar initials={discordMetadata?.full_name.slice(0, 2)} />
          Hey, {discordMetadata?.full_name}!
          <LogoutButton />
        </div>
      ) : (
        <DiscordOAuthButton />
      )}
    </div>
  );
}
