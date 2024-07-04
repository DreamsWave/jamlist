export interface Song {
  id: string;
  title: string;
  artistId?: string;
  price?: string;
  genreIds?: string;
  moodIds?: string;
  isOriginal?: boolean;
  hasCopyright?: boolean;
  tagIds?: string;
  timesPlayed?: number;
  likes?: number;
  createdAt: Date;
  updatedAt: Date;
  lastPlayedAt?: Date;
}
