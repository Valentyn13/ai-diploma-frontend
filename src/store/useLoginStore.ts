import { create } from 'zustand';

interface LoginState {
  isLoading: boolean;
  setIsLoading: (isOpen: boolean) => void;
}

export const useLoginStore = create<LoginState>()(set => ({
  isLoading: false,
  setIsLoading: loading => set({ isLoading: loading }),
}));
