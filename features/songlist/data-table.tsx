"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useFiltersStore } from "./filters/filters-store";
import SongsTable from "@/features/songlist/songs-table";
import SongsTableFooter from "@/features/songlist/songs-table-footer";
import SongsTableHeader from "./songs-table-header";
import { cn } from "@/lib/utils";
import { useSongsStore } from "./songs-store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { filterInput, setFilterInput } = useFiltersStore((store) => store);
  const { songsPageSize, setSongsPageSize } = useSongsStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter: filterInput,
    },
    initialState: {
      pagination: {
        pageSize: songsPageSize,
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilterInput,
    globalFilterFn: "auto",
  });

  useEffect(() => {
    const initialSongsPageSize = JSON.parse(
      localStorage.getItem("songsPageSize") || "",
    );
    if (initialSongsPageSize) {
      setSongsPageSize(initialSongsPageSize.state.songsPageSize);
      table.setPageSize(initialSongsPageSize.state.songsPageSize);
    }
  }, [setSongsPageSize, table]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <SongsTableHeader table={table} />
      <SongsTable table={table} />
      <SongsTableFooter table={table} />
    </div>
  );
}
