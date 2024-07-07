import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";
import SongsTablePagination from "@/features/songlist/songs-table-pagination";

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
      {/* <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button> */}
    </div>
  );
}

export default SongsTableFooter;
