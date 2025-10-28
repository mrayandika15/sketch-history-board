import { create } from "zustand";

type HistoryState = {
  ids: number[];
  setIds: (ids: number[]) => void;
  addId: (id: number) => void;
  removeId: (id: number) => void;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>((set) => ({
  ids: [],
  setIds: (ids) => set({ ids }),
  addId: (id) =>
    set((state) => ({ ids: Array.from(new Set([...state.ids, id])) })),
  removeId: (id) =>
    set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
  clear: () => set({ ids: [] }),
}));
