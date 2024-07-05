"use client";

import { useSonglistStore } from "@/features/songlist/store";
import Filter from "@/features/songlist/filters/BadgeFilter";
import type { Tag } from "@/data/db/schema";

interface FilterTagsProps {
  tags: Tag[];
}

const FilterTags = ({ tags }: FilterTagsProps) => {
  const { selectedTags, addTag, removeTag } = useSonglistStore(
    (store) => store.selectedFilters,
  );
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
