import { db } from "@/data/db";

async function Songlist() {
  const songs = await db.query.songs.findMany({
    with: {
      tags: {
        columns: { songId: false, tagId: false },
        with: { tag: { columns: { title: true, id: true } } },
      },
      moods: {
        columns: { songId: false, moodId: false },
        with: { mood: { columns: { title: true, id: true } } },
      },
      genres: {
        columns: { songId: false, genreId: false },
        with: { genre: { columns: { title: true, id: true } } },
      },
    },
  });

  if (!songs) return "Empty";

  return (
    <div>
      <h1>Songlist</h1>
      {JSON.stringify(songs)}
      {songs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  );
}

export default Songlist;
