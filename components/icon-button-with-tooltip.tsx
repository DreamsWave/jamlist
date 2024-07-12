import { cn } from "@/lib/utils";
import {
  Button,
  type ButtonProps,
  buttonVariants,
} from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface IconButtonWithTooltipProps extends ButtonProps {
  Icon: LucideIcon;
  title?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

function IconButtonWithTooltip({
  Icon,
  title = "",
  side = "right",
  className,
  ...props
}: IconButtonWithTooltipProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9 p-0",
            className,
          )}
          {...props}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} className="flex items-center gap-4">
        {title}
      </TooltipContent>
    </Tooltip>
  );
}

export default IconButtonWithTooltip;
