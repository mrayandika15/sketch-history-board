import { create } from "zustand";

type EditState = {
  isEditing: boolean;
  setEditing: (on: boolean) => void;
  startEditing: () => void;
  stopEditing: () => void;
  toggleEditing: () => void;
};

export const useEditStateStore = create<EditState>((set, get) => ({
  isEditing: false,
  setEditing: (on) => set({ isEditing: on }),
  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),
  toggleEditing: () => set({ isEditing: !get().isEditing }),
}));
