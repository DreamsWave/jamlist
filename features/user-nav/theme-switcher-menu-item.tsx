import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React from "react";
import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const ThemeSwitcherMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      ref={ref}
      className="relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <Label htmlFor="dark-theme" className="h-full w-full cursor-pointer">
        Dark Theme
      </Label>
      <Switch
        id="dark-theme"
        checked={theme === "dark"}
        onCheckedChange={(checked) =>
          checked ? setTheme("dark") : setTheme("light")
        }
      />
    </div>
  );
});

ThemeSwitcherMenuItem.displayName = "ThemeSwitcherMenuItem";

export default ThemeSwitcherMenuItem;
