import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import SongsTablePagination from "@/features/songlist/islands/songs-table/songs-table-pagination";

export interface SongsTableFooterProps<TData> {
  className?: string;
  table: Table<TData>;
}

function SongsTableFooter<TData>({
  className,
  table,
}: SongsTableFooterProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-end space-x-2 pt-4",
        className,
      )}
    >
      <SongsTablePagination table={table} />
    </div>
  );
}

export default SongsTableFooter;
