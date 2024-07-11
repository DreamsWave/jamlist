"use client";

import { useFiltersStore } from "@/features/songlist/stores/filters-store";
import Filter from "@/features/songlist/islands/filters/filter-components/badge-filter";
import type { Genre } from "@/data/db/schema";

interface FilterGenresProps {
  genres: Genre[];
}

const FilterGenres = ({ genres }: FilterGenresProps) => {
  const { selectedGenres, addGenre, removeGenre } = useFiltersStore(
    (store) => store,
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
