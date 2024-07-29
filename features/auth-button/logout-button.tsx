"use client";

import { signOut } from "@/server/actions/auth";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex w-fit"
      variant="outline"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Logout
    </Button>
  );
}

function LogoutButton() {
  return (
    <form action={signOut}>
      <SubmitButton />
    </form>
  );
}

export default LogoutButton;
