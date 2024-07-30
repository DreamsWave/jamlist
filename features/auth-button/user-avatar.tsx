"use client";

import { cn } from "@/utils/tailwind";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useIsUserSubscriber from "@/hooks/useIsUserSubscriber";
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
  const { isSubscriber } = useIsUserSubscriber();

  useEffect(() => {
    setIsActiveBorder(isSubscriber);
  }, [isSubscriber]);

  return (
    <div
      className={cn(
        "group relative h-[34px] w-[34px] overflow-hidden rounded-full bg-transparent p-[2px]",
      )}
      style={{
        background: isActiveBorder
          ? "linear-gradient(to right, #6b72e1, #9b59b6)"
          : "transparent",
      }}
    >
      <Avatar className="h-full w-full">
        <AvatarImage src={discordMetadata?.avatar_url} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default UserAvatar;
