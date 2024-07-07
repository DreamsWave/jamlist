import ControlsBar from "@/features/songlist/controls/controls-bar";
import FiltersCard from "@/features/songlist/filters/filters-card";
import SonglistTable from "@/features/songlist/songlist/songlist-table";
import { getSongsAction } from "@/server/actions/song";

export default async function HomePage() {
  const songs = await getSongsAction();

  return (
    <main className="min-h-screen bg-muted/40">
      <section className="grids-col-1 container grid gap-4 pt-10 lg:grid-cols-[minmax(150px,_300px)_1fr]">
        <FiltersCard className="hidden lg:col-span-1 lg:row-span-2 lg:row-start-2 lg:flex" />
        <ControlsBar className="lg:col-start-2" />
        <SonglistTable className="lg:col-start-2" songs={songs} />
      </section>
    </main>
  );
}
