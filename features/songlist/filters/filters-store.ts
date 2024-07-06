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

export const useFiltersStore = create<FiltersState>()((set) => ({
  selectedGenres: [],
  selectedMoods: [],
  selectedTags: [],
  addGenre: (genre: Genre) =>
    set((state) => ({
      ...state,
      selectedGenres: [...state.selectedMoods, genre],
    })),
  addMood: (mood: Mood) =>
    set((state) => ({
      ...state,
      selectedMoods: [...state.selectedMoods, mood],
    })),
  addTag: (tag: Tag) =>
    set((state) => ({
      ...state,
      selectedTags: [...state.selectedTags, tag],
    })),
  removeGenre: (genre: Genre) =>
    set((state) => ({
      ...state,
      selectedGenres: state.selectedGenres.filter((g) => g.id !== genre.id),
    })),
  removeMood: (mood: Mood) =>
    set((state) => ({
      ...state,
      selectedMoods: state.selectedMoods.filter((m) => m.id !== mood.id),
    })),
  removeTag: (tag: Tag) =>
    set((state) => ({
      ...state,
      selectedTags: state.selectedTags.filter((t) => t.id !== tag.id),
    })),
}));
