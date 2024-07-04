import AddSong from "@/components/AddSong";
import Filters from "@/components/Filters";
import Songlist from "@/components/Songlist";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <header className="flex justify-between">
          <Filters />
          <AddSong />
        </header>
        <Songlist />
      </section>
    </main>
  );
}
