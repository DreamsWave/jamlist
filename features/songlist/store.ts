import { create } from "zustand";
import type { Genre, Mood, Tag } from "@/data/db/schema";

interface FiltersState {
  selectedGenres: Genre[];
  selectedMoods: Mood[];
  selectedTags: Tag[];
  addGenre: (genre: Genre) => void;
  addMood: (mood: Mood) => void;
  addTag: (tag: Tag) => void;
  removeGenre: (genre: Genre) => void;
  removeMood: (mood: Mood) => void;
  removeTag: (tag: Tag) => void;
}

interface SonglistState {
  selectedFilters: FiltersState;
}

export const useSonglistStore = create<SonglistState>()((set) => ({
  selectedFilters: {
    selectedGenres: [],
    selectedMoods: [],
    selectedTags: [],
    addGenre: (genre: Genre) =>
      set((state) => ({
        selectedFilters: {
          ...state.selectedFilters,
          selectedGenres: [...state.selectedFilters.selectedMoods, genre],
        },
      })),
    addMood: (mood: Mood) =>
      set((state) => ({
        selectedFilters: {
          ...state.selectedFilters,
          selectedMoods: [...state.selectedFilters.selectedMoods, mood],
        },
      })),
    addTag: (tag: Tag) =>
      set((state) => ({
        selectedFilters: {
          ...state.selectedFilters,
          selectedTags: [...state.selectedFilters.selectedTags, tag],
        },
      })),
    removeGenre: (genre: Genre) =>
      set((state) => ({
        selectedFilters: {
          ...state.selectedFilters,
          selectedGenres: state.selectedFilters.selectedGenres.filter(
            (g) => g.id !== genre.id,
          ),
        },
      })),
    removeMood: (mood: Mood) =>
      set((state) => ({
        selectedFilters: {
          ...state.selectedFilters,
          selectedMoods: state.selectedFilters.selectedMoods.filter(
            (m) => m.id !== mood.id,
          ),
        },
      })),
    removeTag: (tag: Tag) =>
      set((state) => ({
        selectedFilters: {
          ...state.selectedFilters,
          selectedTags: state.selectedFilters.selectedTags.filter(
            (t) => t.id !== tag.id,
          ),
        },
      })),
  },
}));
