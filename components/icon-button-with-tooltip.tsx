import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface IconButtonWithTooltipProps extends ButtonProps {
  icon?: JSX.Element;
  title?: string;
  label?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  children?: React.ReactNode;
}

const IconButtonWithTooltip = React.forwardRef<
  HTMLButtonElement,
  IconButtonWithTooltipProps
>(
  (
    { className, icon, title = "", label, side = "bottom", children, ...props },
    ref,
  ) => {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", className)}
            ref={ref}
            {...props}
          >
            {icon}
            <span className="sr-only">{title}</span>
          </Button>
        </TooltipTrigger>
        {title && (
          <TooltipContent side={side} className="flex items-center gap-4">
            {title}{" "}
            {label && (
              <span className="ml-auto text-muted-foreground">{label}</span>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    );
  },
);

IconButtonWithTooltip.displayName = "IconButtonWithTooltip";

export default IconButtonWithTooltip;
