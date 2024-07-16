"use client";

import { useSonglistStore } from "@/providers/songlist-store-provider";
import Filter from "@/features/songlist/islands/filters/filter-components/badge-filter";
import type { Mood } from "@/data/db/schema";

interface FilterMoodsProps {
  moods: Mood[];
}

const FilterMoods = ({ moods }: FilterMoodsProps) => {
  const {
    filters: { selectedMoods, addMood, removeMood },
  } = useSonglistStore((store) => store);
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
