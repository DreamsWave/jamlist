import { create } from "zustand";
import type { Genre, Mood, Tag } from "@/data/db/schema";

interface FiltersState {
  selectedGenres: Genre[];
  addGenre: (genre: Genre) => void;
  removeGenre: (genre: Genre) => void;
  selectedMoods: Mood[];
  addMood: (mood: Mood) => void;
  removeMood: (mood: Mood) => void;
  selectedTags: Tag[];
  addTag: (tag: Tag) => void;
  removeTag: (tag: Tag) => void;
  filterInput: string | number;
  setFilterInput: (input: string | number) => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  selectedGenres: [],
  addGenre: (genre: Genre) =>
    set((state) => ({
      ...state,
      selectedGenres: [...state.selectedMoods, genre],
    })),
  removeGenre: (genre: Genre) =>
    set((state) => ({
      ...state,
      selectedGenres: state.selectedGenres.filter((g) => g.id !== genre.id),
    })),
  selectedMoods: [],
  addMood: (mood: Mood) =>
    set((state) => ({
      ...state,
      selectedMoods: [...state.selectedMoods, mood],
    })),
  removeMood: (mood: Mood) =>
    set((state) => ({
      ...state,
      selectedMoods: state.selectedMoods.filter((m) => m.id !== mood.id),
    })),
  selectedTags: [],
  addTag: (tag: Tag) =>
    set((state) => ({
      ...state,
      selectedTags: [...state.selectedTags, tag],
    })),
  removeTag: (tag: Tag) =>
    set((state) => ({
      ...state,
      selectedTags: state.selectedTags.filter((t) => t.id !== tag.id),
    })),
  filterInput: "",
  setFilterInput: (input: string | number) =>
    set((state) => ({
      ...state,
      filterInput: input,
    })),
}));
