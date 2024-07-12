import Songlist from "@/features/songlist/songlist";
import { Suspense } from "react";

export default async function SonglistPage() {
  return (
    <main className="min-h-screen bg-muted/40">
      <Suspense fallback={<Songlist isLoading={true} />}>
        <Songlist />
      </Suspense>
    </main>
  );
}
