import Songlist from "@/components/Songlist";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Songlist />
    </main>
  );
}
