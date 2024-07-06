"use client";

import { useFiltersStore } from "@/features/songlist/filters/filters-store";
import Filter from "@/features/songlist/filters/filter-components/badge-filter";
import type { Tag } from "@/data/db/schema";

interface FilterTagsProps {
  tags: Tag[];
}

const FilterTags = ({ tags }: FilterTagsProps) => {
  const { selectedTags, addTag, removeTag } = useFiltersStore((store) => store);
  return (
    <Filter
      label="Tags"
      items={tags}
      selectedItems={selectedTags}
      addItem={addTag}
      removeItem={removeTag}
    />
  );
};

export default FilterTags;
