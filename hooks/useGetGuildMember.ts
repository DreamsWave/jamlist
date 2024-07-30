import { env } from "@/env";
import { getGuildMember } from "@/lib/discord";
import type { GuildMember } from "@/types";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

const DISCORD_REFETCH_INTERVAL =
  Number(env.NEXT_PUBLIC_DISCORD_REFETCH_INTERVAL) ?? 1000 * 60 * 5; // 5 minutes

const useGetGuildMember = (
  discordId: string | undefined,
): UseQueryResult<GuildMember | null, Error> => {
  return useQuery({
    queryKey: ["getGuildMember"],
    queryFn: () => getGuildMember(discordId),
    staleTime: Number.POSITIVE_INFINITY,
    refetchInterval: DISCORD_REFETCH_INTERVAL,
  });
};

export default useGetGuildMember;
