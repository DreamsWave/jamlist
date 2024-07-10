import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SongsState {
  songsPageSize: number;
  setSongsPageSize: (size: number) => void;
}

export const useSongsStore = create<SongsState>()(
  persist(
    (set, get) => ({
      songsPageSize: 10,
      setSongsPageSize: (size: number) => set({ songsPageSize: size }),
    }),
    {
      name: "songsPageSize",
    },
  ),
);
