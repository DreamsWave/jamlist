"use client";

import { cn } from "@/utils/tailwind";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import useIsSub from "@/hooks/useIsSub";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { getDiscordMetadata } from "@/utils/discord";

function UserAvatar({
  initials = "",
}: {
  url?: string;
  activeBorder?: boolean;
  initials?: string;
}) {
  const [isActiveBorder, setIsActiveBorder] = useState<boolean>(false);
  const { user } = useUser();
  const discordMetadata = getDiscordMetadata(user);
  const isSub = false;
  // const { isSub } = useIsSub();

  // useEffect(() => {
  //   setIsActiveBorder(isSub);
  // }, [isSub]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-full bg-transparent p-[2px]",
      )}
      style={{
        background: isActiveBorder
          ? "linear-gradient(to right, #6b72e1, #9b59b6)"
          : "transparent",
      }}
    >
      <Avatar>
        <AvatarImage src={discordMetadata?.avatar_url} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default UserAvatar;
