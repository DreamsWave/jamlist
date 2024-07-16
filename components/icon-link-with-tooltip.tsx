import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface IconLinkWithTooltipProps extends LinkProps {
  icon?: JSX.Element;
  title?: string;
  label?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  children?: React.ReactNode;
}

const IconLinkWithTooltip = React.forwardRef<
  HTMLAnchorElement,
  IconLinkWithTooltipProps
>(
  (
    {
      className,
      icon,
      title = "",
      label,
      side = "bottom",
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const variant = isActive ? "default" : "ghost";

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={href ?? "#"}
            className={cn(
              buttonVariants({ variant, size: "icon" }),
              "h-8 w-8",
              isActive &&
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
            )}
            ref={ref}
            {...props}
          >
            {icon}
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side={side} className="flex items-center gap-4">
          {title}{" "}
          {label && (
            <span className="ml-auto text-muted-foreground">{label}</span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  },
);

IconLinkWithTooltip.displayName = "IconLinkWithTooltip";

export default IconLinkWithTooltip;
