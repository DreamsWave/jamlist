import { getSongsAction } from "@/server/actions/song";
import { DataTable } from "@/features/songlist/data-table";
import { columns } from "@/features/songlist/songs-table-columns";

async function Songlist() {
  try {
    const songs = await getSongsAction();

    return (
      <section className="grids-col-1 container-xs sm:container-sm grid gap-4 py-10 md:container">
        {/* <section className="grids-col-1 container grid gap-4 py-10 lg:grid-cols-[minmax(150px,_300px)_1fr]"> */}
        {/* <FiltersCard className="hidden lg:flex" /> */}
        <DataTable columns={columns} data={songs ?? []} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="grids-col-1 container-xs sm:container-sm grid gap-4 py-10 md:container">
        {/* <section className="grids-col-1 container grid gap-4 py-10 lg:grid-cols-[minmax(150px,_300px)_1fr]"> */}
        {/* <FiltersCard className="hidden lg:flex" /> */}
        <DataTable columns={columns} data={[]} />
      </section>
    );
  }
}

export default Songlist;
