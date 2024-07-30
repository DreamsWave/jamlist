"use client";

import { signOut } from "@/server/actions/auth";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="relative flex h-fit w-full cursor-pointer select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      variant="ghost"
    >
      Logout
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
    </Button>
  );
};

const LogoutMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className }, ref) => {
  return (
    <div ref={ref}>
      <form action={signOut}>
        <SubmitButton />
      </form>
    </div>
  );
});

LogoutMenuItem.displayName = "LogoutMenuItem";

export default LogoutMenuItem;
