import { create } from 'zustand';

type State = {
  showUpdateModal: boolean;
  requestDone: boolean;
};

type Action = {
  setShowUpdateModal: (showUpdateModal: boolean) => void;
  setRequestDone: (requestDone: boolean) => void;
};

type Store = State & Action;

export const useShowUpdateAppStore = create<Store>()(set => ({
  showUpdateModal: false,
  requestDone: false,
  setRequestDone: requestDone => set({ requestDone }),
  setShowUpdateModal: showUpdateModal => set({ showUpdateModal }),
}));
