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
import SongsTableBase from "@/features/songlist/islands/songs-table/songs-table-base";
import SongsTableFooter from "@/features/songlist/islands/songs-table/songs-table-footer";
import SongsTableHeader from "@/features/songlist/islands/songs-table/songs-table-header";
import { cn } from "@/lib/utils";
import { useSonglistStore } from "@/providers/songlist-store-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { faker } from "@faker-js/faker";

interface SongsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  className?: string;
}

export default function SongsTable<TData, TValue>({
  columns,
  data,
  className,
  isLoading = false,
}: SongsTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { searchInput, setSearchInput } = useSonglistStore((store) => store);
  const { songsPageSize, setSongsPageSize } = useSonglistStore(
    (store) => store,
  );

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
      globalFilter: searchInput,
    },
    initialState: {
      pagination: {
        pageSize: songsPageSize ?? 10,
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchInput,
    globalFilterFn: "auto",
  });

  useEffect(() => {
    const initialSongsPageSize = JSON.parse(
      localStorage.getItem("songlist") || "",
    );
    if (initialSongsPageSize) {
      setSongsPageSize(initialSongsPageSize.state.songsPageSize);
      table.setPageSize(initialSongsPageSize.state.songsPageSize);
    }
  }, [setSongsPageSize, table]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <SongsTableHeader table={table} />
      <SongsTableBase table={table} />
      <SongsTableFooter table={table} />
    </div>
  );
}
