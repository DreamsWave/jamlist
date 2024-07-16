import type { Genre, Mood, Tag } from "@/data/db/schema";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { produce } from "immer";

export type SonglistState = {
  songsPageSize: number;
  searchInput: string;
  filters: {
    selectedGenres: Genre[];
    selectedMoods: Mood[];
    selectedTags: Tag[];
  };
};

export type SonglistActions = {
  setSongsPageSize: (size: number) => void;
  setSearchInput: (input: string) => void;
  filters: {
    addGenre: (genre: Genre) => void;
    removeGenre: (genre: Genre) => void;
    addMood: (mood: Mood) => void;
    removeMood: (mood: Mood) => void;
    addTag: (tag: Tag) => void;
    removeTag: (tag: Tag) => void;
  };
};

export type SonglistStore = SonglistState & SonglistActions;

export const defaultInitState: SonglistState = {
  songsPageSize: 10,
  searchInput: "",
  filters: {
    selectedGenres: [],
    selectedMoods: [],
    selectedTags: [],
  },
};

export const createSonglistStore = (
  initState: SonglistState = defaultInitState,
) => {
  return createStore<SonglistStore>()(
    persist(
      (set) => ({
        ...initState,
        setSongsPageSize: (size: number) =>
          set(
            produce((state: SonglistStore) => {
              state.songsPageSize = size;
            }),
          ),
        setSearchInput: (input: string) =>
          set(
            produce((state: SonglistStore) => {
              state.searchInput = input;
            }),
          ),
        filters: {
          ...initState.filters,
          addGenre: (genre: Genre) =>
            set((state) => ({
              ...state,
              filters: {
                ...state.filters,
                selectedGenres: [...state.filters.selectedGenres, genre],
              },
            })),
          removeGenre: (genre: Genre) =>
            set((state) => ({
              ...state,
              filters: {
                ...state.filters,
                selectedGenres: state.filters.selectedGenres.filter(
                  (g) => g.id !== genre.id,
                ),
              },
            })),
          addMood: (mood: Mood) =>
            set((state) => ({
              ...state,
              filters: {
                ...state.filters,
                selectedMoods: [...state.filters.selectedMoods, mood],
              },
            })),
          removeMood: (mood: Mood) =>
            set((state) => ({
              ...state,
              filters: {
                ...state.filters,
                selectedMoods: state.filters.selectedMoods.filter(
                  (m) => m.id !== mood.id,
                ),
              },
            })),
          addTag: (tag: Tag) =>
            set((state) => ({
              ...state,
              filters: {
                ...state.filters,
                selectedTags: [...state.filters.selectedTags, tag],
              },
            })),
          removeTag: (tag: Tag) =>
            set((state) => ({
              ...state,
              filters: {
                ...state.filters,
                selectedTags: state.filters.selectedTags.filter(
                  (t) => t.id !== tag.id,
                ),
              },
            })),
        },
      }),
      { name: "songlist" },
    ),
  );
};
