import { create } from "zustand";

interface DialogSlice {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
}
export const useDialogStore = create<DialogSlice>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  toggleDialog: () => set((state: any) => ({ isOpen: !state.isOpen })),
}));
