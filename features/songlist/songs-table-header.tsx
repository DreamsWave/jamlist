"use client";

import AddSongDialog from "@/features/songlist/actions/add-song-dialog";
import { cn } from "@/lib/utils";
import OpenFiltersSideSheetButton from "@/features/songlist/filters/open-filters-side-sheet-button";
import DebouncedInput from "@/components/DebouncedInput";
import { useFiltersStore } from "./filters/filters-store";
import type { Table } from "@tanstack/react-table";
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
        <DebouncedInput
          placeholder="Search songs..."
          value={filterInput ?? ""}
          onChange={(value) => setFilterInput(value)}
          className="max-w-sm"
        />
      </div>
      <AddSongDialog />
    </div>
  );
}

export default SongsTableHeader;
