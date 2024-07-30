import { createClient } from "@/utils/supabase/server";
import DiscordOAuthButton from "@/features/user-nav/discord-oauth-button";
import { getDiscordMetadata } from "@/utils/discord";
import UserNav from "./user-nav";

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

  return user ? (
    <UserNav initials={discordMetadata?.full_name.slice(0, 2)} />
  ) : (
    <DiscordOAuthButton />
  );
}
