import { Button, type ButtonProps } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import React from "react";

interface IconButtonWithTooltipProps extends ButtonProps {
  Icon: LucideIcon;
  title?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

const IconButtonWithTooltip = React.forwardRef<
  HTMLInputElement,
  IconButtonWithTooltipProps
>(({ className, Icon, title = "", side = "right", ...props }, ref) => {
  const innerRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" {...props} ref={innerRef}>
          <Icon className="h-4 w-4" />
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{title}</TooltipContent>
    </Tooltip>
  );
});

IconButtonWithTooltip.displayName = "IconButtonWithTooltip";

export default IconButtonWithTooltip;
