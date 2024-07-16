"use client";

import { useSonglistStore } from "@/providers/songlist-store-provider";
import Filter from "@/features/songlist/islands/filters/filter-components/badge-filter";
import type { Tag } from "@/data/db/schema";

interface FilterTagsProps {
  tags: Tag[];
}

const FilterTags = ({ tags }: FilterTagsProps) => {
  const {
    filters: { selectedTags, addTag, removeTag },
  } = useSonglistStore((store) => store);
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
