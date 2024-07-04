import songs from "@/data/songs.json";

const db = null;

export interface Song {
  songId: string;
  title: string;
  artistId: string;
  price: number;
  genreIds: string[];
  moodIds: string[];
  isOriginal: string;
  isCopyright: string;
  tagIds: string[];
  timesPlayed: number;
  likes: number;
  createdAt: string;
  lastPlayedAt: string;
}

export function getSongs(): Promise<Song[]> {
  return Promise.resolve(songs as Song[]);
}
