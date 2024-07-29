import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table as TableBase,
} from "@/components/ui/table";
import { flexRender, type Table as TTable } from "@tanstack/react-table";
import { columns } from "@/features/songlist/islands/songs-table/songs-table-columns";
import { cn } from "@/utils/tailwind";
import { Card } from "@/components/ui/card";

interface SongsTableBaseProps<TData> {
  table: TTable<TData>;
}

function SongsTableBase<TData>({ table }: SongsTableBaseProps<TData>) {
  return (
    <Card>
      <TableBase>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      minWidth: header.column.columnDef.minSize,
                      width: header.column.columnDef.size,
                      maxWidth: header.column.columnDef.maxSize,
                    }}
                  >
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
                  <TableCell
                    key={cell.id}
                    className={cn("h-14 py-0")}
                    style={{
                      minWidth: cell.column.columnDef.minSize,
                      width: cell.column.columnDef.size,
                      maxWidth: cell.column.columnDef.maxSize,
                    }}
                  >
                    <span className="line-clamp-2 leading-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </span>
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
    </Card>
  );
}

export default SongsTableBase;
