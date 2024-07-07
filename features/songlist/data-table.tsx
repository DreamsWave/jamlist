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

import { useState } from "react";
import { useFiltersStore } from "./filters/filters-store";
import SongsTable from "@/features/songlist/songs-table";
import SongsTableFooter from "@/features/songlist/songs-table-footer";
import SongsTableHeader from "./songs-table-header";
import { cn } from "@/lib/utils";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { filterInput, setFilterInput } = useFiltersStore((store) => store);

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
        pageSize: 10,
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilterInput,
    globalFilterFn: "auto",
  });

  return (
    <div className={cn(className)}>
      <SongsTableHeader table={table} />
      <SongsTable table={table} />
      <SongsTableFooter table={table} />
    </div>
  );
}
