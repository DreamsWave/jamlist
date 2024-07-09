import Songlist from "@/features/songlist/songlist";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-muted/40">
      <Songlist />
    </main>
  );
}
