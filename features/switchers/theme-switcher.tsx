"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import IconButtonWithTooltipDropdown from "@/components/icon-button-with-tooltip-dropdown";

function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <IconButtonWithTooltipDropdown
      title="Toggle theme"
      icon={
        <>
          <Sun className="h-5 w-5 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute h-5 w-5 scale-0 transition-all dark:scale-100" />
        </>
      }
      side="bottom"
      dropdownSide="bottom"
    >
      <DropdownMenuItem onClick={() => setTheme("light")}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        System
      </DropdownMenuItem>
    </IconButtonWithTooltipDropdown>
  );
}

export default ThemeSwitcher;
