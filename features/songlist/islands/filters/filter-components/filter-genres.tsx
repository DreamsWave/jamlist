"use client";

import { useSonglistStore } from "@/providers/songlist-store-provider";
import Filter from "@/features/songlist/islands/filters/filter-components/badge-filter";
import type { Genre } from "@/data/db/schema";

interface FilterGenresProps {
  genres: Genre[];
}

const FilterGenres = ({ genres }: FilterGenresProps) => {
  const {
    filters: { selectedGenres, addGenre, removeGenre },
  } = useSonglistStore((store) => store);
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
