import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button, type ButtonProps } from "@/components/ui/button";
import React from "react";

interface IconButtonWithTooltipDropdownProps extends ButtonProps {
  icon?: JSX.Element;
  title?: string;
  label?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  dropdownSide?: "top" | "right" | "bottom" | "left" | undefined;
  showDropdownTitle?: boolean;
  children?: React.ReactNode;
}

const IconButtonWithTooltipDropdown = React.forwardRef<
  HTMLButtonElement,
  IconButtonWithTooltipDropdownProps
>(
  (
    {
      className,
      icon,
      title = "",
      label,
      side = "bottom",
      dropdownSide = "bottom",
      showDropdownTitle = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <DropdownMenu>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                ref={ref}
                {...props}
              >
                {icon}
                <span className="sr-only">{title}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side={side} className="flex items-center gap-4">
            {title}{" "}
            {label && (
              <span className="ml-auto text-muted-foreground">{label}</span>
            )}
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent side={dropdownSide} align="start" sideOffset={4}>
          {showDropdownTitle && (
            <>
              <DropdownMenuLabel>
                {title} {label ? `(${label})` : ""}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

IconButtonWithTooltipDropdown.displayName = "IconButtonWithTooltipDropdown";

export default IconButtonWithTooltipDropdown;
