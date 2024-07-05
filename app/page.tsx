import Controls from "@/features/songlist/Controls";
import Filters from "@/features/songlist/Filters";
import Songlist from "@/features/songlist/Songlist";

export default function Home() {
  return (
    <main>
      <section className="grids-col-1 container mt-10 grid gap-4 lg:grid-cols-[minmax(150px,_300px)_1fr]">
        <Filters className="hidden lg:col-span-1 lg:row-span-2 lg:row-start-2 lg:flex" />
        <Controls className="lg:col-start-2" />
        <Songlist className="lg:col-start-2" />
      </section>
    </main>
  );
}
