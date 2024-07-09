"use client";

import type { Song } from "@/data/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import Moment from "moment";
import DropDownMenuActions from "@/features/songlist/actions/dropdown-menu-actions";
import TableHeadButton from "@/components/TableHeadButton";

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <TableHeadButton column={column}>ID</TableHeadButton>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableHeadButton column={column}>Title</TableHeadButton>
    ),
  },
  {
    accessorKey: "artistId",
    header: ({ column }) => (
      <TableHeadButton column={column}>Artist</TableHeadButton>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <TableHeadButton column={column}>Price</TableHeadButton>
    ),
  },
  {
    accessorKey: "timesPlayed",
    header: ({ column }) => (
      <TableHeadButton column={column}>Times Played</TableHeadButton>
    ),
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
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableHeadButton column={column}>Added At</TableHeadButton>
    ),
    accessorFn: (d) => {
      return Moment(d.createdAt).local().format("DD/MM/YYYY");
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <TableHeadButton column={column}>Tags</TableHeadButton>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DropDownMenuActions song={row.original} />;
    },
  },
];
