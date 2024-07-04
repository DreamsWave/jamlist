import { db } from "@/data/db";
import { songs as songsSchema } from "@/data/db/schema";

async function Songlist() {
  const songs = await db.select().from(songsSchema);

  if (!songs) return "Empty";

  return (
    <div>
      <h1>Songlist</h1>
      {songs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  );
}

export default Songlist;
