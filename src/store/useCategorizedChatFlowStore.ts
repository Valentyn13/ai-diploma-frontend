import { create } from 'zustand';

export enum ChatCategoriesEnum {
  BAD_HABITS = 'bad_habits',
  ANXIETY = 'anxiety',
  NEGATIVE = 'negative',
  SELF_DEV = 'self_dev',
}

export type ChatCategories = ChatCategoriesEnum | null;

type State = {
  currentStep: ChatControllerSteps;
  selectedCategory: ChatCategories;
  isDrawerOpen: boolean;
  lastActiveSessionId: string | null;
};

type Actions = {
  setIsDrawerOpen: (isOpen: boolean) => void;
  setLatestActiveSessionId: (sessionId: string | null) => void;
  setSelectedCategory: (category: ChatCategories) => void;
  setCurrentStep: (step: ChatControllerSteps) => void;
  reset: () => void;
};

const initialValues: State = {
  currentStep: 'selection',
  isDrawerOpen: false,
  selectedCategory: null,
  lastActiveSessionId: null,
};

type ChatsState = State & Actions;

export type ChatControllerSteps = 'selection' | 'list' | 'chat';

export const useCategorizedChatFlowStore = create<ChatsState>()(set => ({
  ...initialValues,
  setIsDrawerOpen: isOpen => set({ isDrawerOpen: isOpen }),
  setLatestActiveSessionId: sessionId =>
    set({ lastActiveSessionId: sessionId }),
  setSelectedCategory: category => set({ selectedCategory: category }),
  setCurrentStep: step => set({ currentStep: step }),
  reset: () =>
    set(() => ({
      ...initialValues,
    })),
}));
