"use client";

import { useFiltersStore } from "@/features/songlist/filters/filters-store";
import Filter from "@/features/songlist/filters/filter-components/badge-filter";
import type { Mood } from "@/data/db/schema";

interface FilterMoodsProps {
  moods: Mood[];
}

const FilterMoods = ({ moods }: FilterMoodsProps) => {
  const { selectedMoods, addMood, removeMood } = useFiltersStore(
    (store) => store,
  );
  return (
    <Filter
      label="Moods"
      items={moods}
      selectedItems={selectedMoods}
      addItem={addMood}
      removeItem={removeMood}
    />
  );
};

export default FilterMoods;
