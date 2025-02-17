import { env } from "@/env";
import type { DiscordMetadata, GuildMember } from "@/types";
import type { User } from "@supabase/supabase-js";

export function getDiscordMetadata(user: User | null | undefined) {
  if (!user) return null;
  const discordMetadata = user?.user_metadata as DiscordMetadata;
  return discordMetadata;
}

export function hasGuildMemberRole(
  guildMember: GuildMember | null | undefined,
  role: string,
) {
  if (!guildMember) return false;
  return guildMember.roles?.includes(role);
}
