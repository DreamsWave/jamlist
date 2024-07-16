"use client";

import AddSongDialog from "@/features/songlist/components/add-song-dialog-button";
import { cn } from "@/lib/utils";
import OpenFiltersSideSheetButton from "@/features/songlist/islands/filters/open-filters-side-sheet-button";
import DebouncedInput from "@/components/DebouncedInput";
import type { Table } from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSonglistStore } from "@/providers/songlist-store-provider";
export interface SongsTableHeaderProps<TData> {
  className?: string;
  table: Table<TData>;
  pageSizeOptions?: number[];
}

function SongsTableHeader<TData>({ className }: SongsTableHeaderProps<TData>) {
  const { searchInput, setSearchInput } = useSonglistStore((store) => store);

  return (
    <div
      className={cn("flex w-full justify-between space-x-2 pb-4", className)}
    >
      <div className="flex gap-2">
        <OpenFiltersSideSheetButton className="flex lg:hidden" />

        <div className="relative">
          <DebouncedInput
            placeholder="Search songs..."
            value={searchInput}
            onChange={(value) => setSearchInput(String(value))}
            className="max-w-sm"
          />
          {searchInput && (
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2"
              variant="link"
              onClick={() => setSearchInput("")}
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
