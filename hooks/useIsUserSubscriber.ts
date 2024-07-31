"use client";

import { getDiscordMetadata, hasGuildMemberRole } from "@/utils/discord";
import useGetGuildMember from "@/hooks/useGetGuildMember";
import useUser from "@/hooks/useUser";
import { env } from "@/env";

const useIsUserSubscriber = () => {
  const { user, isLoading } = useUser();
  const discordMetadata = getDiscordMetadata(user);
  const { data: guildMember, isFetching } = useGetGuildMember(
    discordMetadata?.provider_id,
  );

  const isSubscriber = hasGuildMemberRole(
    guildMember,
    env.NEXT_PUBLIC_DISCORD_BOOSTY_ROLE_ID,
  );

  return { isSubscriber, isLoading: isLoading || isFetching };
};

export default useIsUserSubscriber;
