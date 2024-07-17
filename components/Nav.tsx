"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import IconLinkWithTooltip from "./icon-link-with-tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
  }[];
  onLinkClick?: () => void;
}

export function Nav({ links, isCollapsed, onLinkClick }: NavProps) {
  const pathname = usePathname();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          const variant = isActive ? "default" : "ghost";
          return isCollapsed ? (
            <IconLinkWithTooltip
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              href={link.href ?? "#"}
              icon={<link.icon className="h-4 w-4" />}
              title={link.title}
              side="right"
              label={link.label}
            />
          ) : (
            <Link
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              href={link.href ?? "#"}
              onClick={onLinkClick}
              className={cn(
                buttonVariants({ variant, size: "sm" }),
                isActive &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "h-8 justify-start",
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    isActive && "text-background dark:text-white",
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
