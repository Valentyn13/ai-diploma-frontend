import { create } from 'zustand';

interface MichaelState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useMichaelStore = create<MichaelState>()(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),
}));
