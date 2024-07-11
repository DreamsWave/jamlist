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

import { useEffect, useMemo, useState } from "react";
import { useFiltersStore } from "./filters/filters-store";
import SongsTable from "@/features/songlist/songs-table";
import SongsTableFooter from "@/features/songlist/songs-table-footer";
import SongsTableHeader from "./songs-table-header";
import { cn } from "@/lib/utils";
import { useSongsStore } from "./songs-store";
import { Skeleton } from "@/components/ui/skeleton";
import { faker } from "@faker-js/faker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { filterInput, setFilterInput } = useFiltersStore((store) => store);
  const { songsPageSize, setSongsPageSize } = useSongsStore();

  // Loading data and columns with skeleton
  const tableData = useMemo(
    () => (isLoading ? Array(10).fill({}) : data),
    [isLoading, data],
  );
  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <Skeleton
                className={cn("h-4")}
                style={
                  column.id === "artistTitle"
                    ? {
                        marginLeft: "1.25rem",
                        maxWidth: faker.helpers.arrayElement([
                          150, 200, 300, 400,
                        ]),
                      }
                    : {}
                }
              />
            ),
          }))
        : columns,
    [isLoading, columns],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
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
