"use client";

import { useSonglistStore } from "@/features/songlist/store";
import Filter from "@/features/songlist/filters/BadgeFilter";
import type { Genre } from "@/data/db/schema";

interface FilterGenresProps {
  genres: Genre[];
}

const FilterGenres = ({ genres }: FilterGenresProps) => {
  const { selectedGenres, addGenre, removeGenre } = useSonglistStore(
    (store) => store.selectedFilters,
  );
  return (
    <Filter
      label="Genres"
      items={genres}
      selectedItems={selectedGenres}
      addItem={addGenre}
      removeItem={removeGenre}
    />
  );
};

export default FilterGenres;
