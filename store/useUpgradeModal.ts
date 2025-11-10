// store/useUpgradeModal.ts
import { create } from "zustand";

interface UpgradeModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useUpgradeModal = create<UpgradeModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
