import { SonglistStoreProvider } from "@/providers/songlist-store-provider";
import { LayoutStoreProvider } from "@/providers/layout-store-provider";

function StoresProvider({ children }: { children: React.ReactNode }) {
  return (
    <LayoutStoreProvider>
      <SonglistStoreProvider>{children}</SonglistStoreProvider>
    </LayoutStoreProvider>
  );
}

export default StoresProvider;
