import Songlist from "@/features/songlist/songlist";
import { Suspense } from "react";

export default async function SonglistPage() {
  return (
    <div className="container-xs mx-0 px-2 py-4 lg:container lg:mx-0 lg:p-4">
      <Suspense fallback={<Songlist isLoading={true} />}>
        <Songlist />
      </Suspense>
    </div>
  );
}
