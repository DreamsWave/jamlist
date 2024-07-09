import { getSongsAction } from "@/server/actions/song";
import { DataTable } from "@/features/songlist/data-table";
import FiltersCard from "@/features/songlist/filters/filters-card";
import { columns } from "@/features/songlist/songs-table-columns";

async function Songlist() {
  try {
    const songs = await getSongsAction();

    return (
      <section className="grids-col-1 container grid gap-4 pt-10 lg:grid-cols-[minmax(150px,_300px)_1fr]">
        <FiltersCard className="hidden lg:flex" />
        <DataTable columns={columns} data={songs ?? []} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="grids-col-1 container grid gap-4 pt-10 lg:grid-cols-[minmax(150px,_300px)_1fr]">
        <FiltersCard className="hidden lg:flex" />
        <DataTable columns={columns} data={[]} />
      </section>
    );
  }
}

export default Songlist;
