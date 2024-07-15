import React from "react";
import { getSongsAction } from "@/server/actions/song";
import SongsTable from "@/features/songlist/islands/songs-table/songs-table";
import { columns } from "@/features/songlist/islands/songs-table/songs-table-columns";

interface SonglistProps {
  isLoading?: boolean;
}

async function Songlist({ isLoading = false }: SonglistProps) {
  try {
    const songs = isLoading ? [] : await getSongsAction();
    return (
      <section>
        {/* <section className="grids-col-1 container grid gap-4 py-10 lg:grid-cols-[minmax(150px,_300px)_1fr]"> */}
        {/* <FiltersCard className="hidden lg:flex" /> */}
        <SongsTable columns={columns} data={songs} isLoading={isLoading} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section>
        {/* <section className="grids-col-1 container grid gap-4 py-10 lg:grid-cols-[minmax(150px,_300px)_1fr]"> */}
        {/* <FiltersCard className="hidden lg:flex" /> */}
        <SongsTable columns={columns} data={[]} isLoading={isLoading} />
      </section>
    );
  }
}

export default Songlist;
