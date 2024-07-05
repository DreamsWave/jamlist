"use client";

import { useSonglistStore } from "@/features/songlist/store";
import Filter from "@/features/songlist/filters/BadgeFilter";
import type { Mood } from "@/data/db/schema";

interface FilterMoodsProps {
  moods: Mood[];
}

const FilterMoods = ({ moods }: FilterMoodsProps) => {
  const { selectedMoods, addMood, removeMood } = useSonglistStore(
    (store) => store.selectedFilters,
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
