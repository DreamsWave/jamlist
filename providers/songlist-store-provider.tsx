"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  createSonglistStore,
  type SonglistStore,
} from "@/stores/songlist-store";

export type SonglistStoreApi = ReturnType<typeof createSonglistStore>;

export const SonglistStoreContext = createContext<SonglistStoreApi | undefined>(
  undefined,
);

export interface SonglistStoreProviderProps {
  children: ReactNode;
}

export const SonglistStoreProvider = ({
  children,
}: SonglistStoreProviderProps) => {
  const storeRef = useRef<SonglistStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSonglistStore();
  }

  return (
    <SonglistStoreContext.Provider value={storeRef.current}>
      {children}
    </SonglistStoreContext.Provider>
  );
};

export const useSonglistStore = <T,>(
  selector: (store: SonglistStore) => T,
): T => {
  const songlistStoreContext = useContext(SonglistStoreContext);

  if (!songlistStoreContext) {
    throw new Error(
      "useSonglistStore must be used within SonglistStoreProvider",
    );
  }

  return useStore(songlistStoreContext, selector);
};
