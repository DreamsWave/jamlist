"use client";

import AddSongDialog from "@/features/songlist/components/add-song-dialog-button";
import { cn } from "@/lib/utils";
import OpenFiltersSideSheetButton from "@/features/songlist/islands/filters/open-filters-side-sheet-button";
import DebouncedInput from "@/components/DebouncedInput";
import { useFiltersStore } from "../../stores/filters-store";
import type { Table } from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
export interface SongsTableHeaderProps<TData> {
  className?: string;
  table: Table<TData>;
  pageSizeOptions?: number[];
}

function SongsTableHeader<TData>({ className }: SongsTableHeaderProps<TData>) {
  const { filterInput, setFilterInput } = useFiltersStore((store) => store);

  return (
    <div
      className={cn("flex w-full justify-between space-x-2 pb-4", className)}
    >
      <div className="flex gap-2">
        <OpenFiltersSideSheetButton className="flex lg:hidden" />

        <div className="relative">
          <DebouncedInput
            placeholder="Search songs..."
            value={filterInput ?? ""}
            onChange={(value) => setFilterInput(value)}
            className="max-w-sm"
          />
          {filterInput && (
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2"
              variant="link"
              onClick={() => setFilterInput("")}
            >
              <CircleX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <AddSongDialog />
    </div>
  );
}

export default SongsTableHeader;
