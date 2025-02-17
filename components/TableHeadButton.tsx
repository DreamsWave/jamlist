import type { Song } from "@/data/db/schema";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/tailwind";

interface TableHeadButtonProps {
  column: Column<Song, unknown>;
  children?: React.ReactNode;
  className?: string;
}

const TableHeadButton = ({
  column,
  children,
  className,
}: TableHeadButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn("h-8 p-2 text-xs", className)}
    >
      {children}

      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-1 h-3 w-3" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-1 h-3 w-3" />
      ) : (
        <ChevronsUpDown className="ml-1 h-3 w-3" />
      )}
    </Button>
  );
};

export default TableHeadButton;
