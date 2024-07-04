"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCallback, useRef, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type FilterItemProps = {
  id: number;
  title: string;
  onSelectionChange?: (isSelected: boolean) => void;
};

export const FilterItem = ({
  id,
  title,
  onSelectionChange,
}: FilterItemProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = useCallback(() => {
    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);
    onSelectionChange?.(newIsSelected);
  }, [isSelected, onSelectionChange]);

  return (
    <Tooltip
      open={showTooltip}
      onOpenChange={(open) =>
        shouldShowTooltip ? setShowTooltip(open) : false
      }
      key={id}
    >
      <TooltipTrigger>
        <Badge
          className={cn(
            "h-6 cursor-pointer hover:bg-slate-300/20 max-w-16",
            isSelected && "bg-slate-300 hover:bg-slate-300/80"
          )}
          variant="outline"
          onClick={handleClick}
        >
          <p className="truncate">{title}</p>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export interface FilterProps {
  label: string;
  items: FilterItemProps[];
}

function Filter({ label, items }: FilterProps) {
  const [selectedItems, setSelectedItems] = useState<FilterItemProps[]>([]);

  const handleItemClick = useCallback(
    (item: FilterItemProps) => {
      if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems]
  );

  return (
    <div className="flex gap-2 items-center">
      <h3>{label}:</h3>
      <div className="flex gap-2">
        {items.map(({ id, title }) => (
          <FilterItem
            key={id}
            id={id}
            title={title}
            onSelectionChange={(isSelected) => handleItemClick({ id, title })}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
