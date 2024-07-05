import Controls from "@/components/songlist/Controls";
import Filters from "@/components/songlist/Filters";
import SongsTable from "@/components/songlist/SongsTable";

export default function Home() {
  return (
    <main>
      <section className="grids-col-1 container mt-10 grid gap-4 lg:grid-cols-[minmax(150px,_300px)_1fr]">
        <Filters className="hidden lg:col-span-1 lg:row-span-2 lg:row-start-2 lg:flex" />
        <Controls className="lg:col-start-2" />
        <SongsTable className="lg:col-start-2" />
      </section>
    </main>
  );
}
