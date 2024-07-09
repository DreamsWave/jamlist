"use client";

import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <Frown className="h-8 w-8" />
      <h2 className="mb-4 text-2xl">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
