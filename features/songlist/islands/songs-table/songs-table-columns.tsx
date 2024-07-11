"use client";

import type { Song } from "@/data/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import Moment from "moment";
import DropDownMenuActions from "@/features/songlist/components/dropdown-menu-actions";
import TableHeadButton from "@/components/TableHeadButton";
import RequestSongDialog from "@/features/songlist/components/request-song-dialog-button";
import { Badge } from "@/components/ui/badge";
import SongTitleCopy from "../../components/song-title-copy";

export const columns: ColumnDef<Song>[] = [
  {
    id: "artistTitle",
    accessorFn: (row) => `${row.artistId} - ${row.title}`,
    header: ({ column }) => (
      <TableHeadButton column={column} className="ml-5">
        Artist - Title
      </TableHeadButton>
    ),
    cell: ({ row }) => {
      return (
        <SongTitleCopy song={row.original}>
          {row.getValue("artistTitle")}
        </SongTitleCopy>
      );
    },
    minSize: 285,
    size: 1000,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <TableHeadButton column={column}>Price</TableHeadButton>
    ),
    accessorFn: (d) => (d.price === "0" ? null : d.price),
    cell: ({ row }) => {
      const price: Song["price"] = row.getValue("price");
      return price ? <Badge variant="secondary">${price}+</Badge> : null;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "timesPlayed",
    header: ({ column }) => (
      <TableHeadButton column={column}>Played</TableHeadButton>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "lastPlayedAt",
    header: ({ column }) => (
      <TableHeadButton column={column}>Last Played</TableHeadButton>
    ),
    accessorFn: (d) => {
      return d.lastPlayedAt
        ? Moment(d.lastPlayedAt).local().format("DD/MM/YYYY")
        : null;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableHeadButton column={column}>Added At</TableHeadButton>
    ),
    accessorFn: (d) => {
      return Moment(d.createdAt).local().format("DD/MM/YYYY");
    },
    sortingFn: (a, b) => {
      return Moment.utc(a.original.createdAt).diff(
        Moment.utc(b.original.createdAt),
      );
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <TableHeadButton column={column}>Tags</TableHeadButton>
    ),
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <RequestSongDialog song={row.original} />
          <DropDownMenuActions song={row.original} />
        </div>
      );
    },
    enableGlobalFilter: false,
    minSize: 130,
  },
];
