import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table as TableBase,
} from "@/components/ui/table";
import { flexRender, type Table as TTable } from "@tanstack/react-table";
import { columns } from "@/features/songlist/songlist/columns";

interface SongsTableProps<TData> {
  table: TTable<TData>;
}

function SongsTable<TData>({ table }: SongsTableProps<TData>) {
  return (
    <div className="rounded-md border bg-background">
      <TableBase>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableBase>
    </div>
  );
}

export default SongsTable;
