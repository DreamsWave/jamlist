"use client";

import type { Song } from "@/data/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import Moment from "moment";
import DropDownMenuActions from "@/features/songlist/actions/dropdown-menu-actions";
import TableHeadButton from "@/components/TableHeadButton";
import RequestSongDialog from "@/features/songlist/actions/request-song-dialog";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Song>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <TableHeadButton column={column}>ID</TableHeadButton>
  //   ),
  //   size: 50,
  // },
  {
    accessorKey: "artistId",
    header: ({ column }) => (
      <TableHeadButton column={column}>Artist</TableHeadButton>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableHeadButton column={column}>Title</TableHeadButton>
    ),
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
    size: 50,
  },
  {
    accessorKey: "timesPlayed",
    header: ({ column }) => (
      <TableHeadButton column={column}>Played</TableHeadButton>
    ),
    size: 55,
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
    size: 90,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableHeadButton column={column}>Added At</TableHeadButton>
    ),
    accessorFn: (d) => {
      return Moment(d.createdAt).local().format("DD/MM/YYYY");
    },
    // sortingFn: "datetime",
    sortingFn: (a, b) => {
      return Moment.utc(a.original.createdAt).diff(
        Moment.utc(b.original.createdAt),
      );
    },
    size: 90,
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <TableHeadButton column={column}>Tags</TableHeadButton>
    ),
    size: 100,
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
    size: 50,
  },
];
