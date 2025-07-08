import { create } from "zustand";

interface UIState {
  isOverlayLoading: boolean;
  setLoading: (val: boolean) => void;
}

export const useOverlayStore = create<UIState>((set) => ({
  isOverlayLoading: false,
  setLoading: (val) => set({ isOverlayLoading: val }),
}));
