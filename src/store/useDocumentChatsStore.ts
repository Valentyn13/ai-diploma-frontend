import { Message } from 'types/Chat';
import { create } from 'zustand';

export type DocumentChatSteps = 'list' | 'categories' | 'chat';

export type DocumentChatCategories = 'general' | 'medicine' | 'engineering';

export type DocumentChat = {
  _id: string;
  userId: string;
  messages: Message[];
  chatName: string;
  category: DocumentChatCategories;
  cachedFilePath: string;
};

type State = {
  documentChats: DocumentChat[];
  currentStep: DocumentChatSteps;
  currentChatId: string | null;
  isAllChatsLoading: boolean;
  currentCategory: DocumentChatCategories | null;
};

type Actions = {
  setCategory: (category: DocumentChatCategories) => void;
  setChats: (chats: DocumentChat[]) => void;
  addChat: (chat: DocumentChat) => void;
  deleteChat: (chatId: string) => void;
  setCurrentStep: (step: DocumentChatSteps) => void;
  setAllChatsLoading: (isLoading: boolean) => void;
  setCurrentChatId: (chatId: string | null) => void;
  reset: () => void;
};

const initialValues: State = {
  currentChatId: null,
  currentCategory: 'general',
  documentChats: [],
  currentStep: 'categories',
  isAllChatsLoading: false,
};

type DocumentChatState = State & Actions;

export const useDocumentChatStore = create<DocumentChatState>()(set => ({
  ...initialValues,
  setCategory: (category: DocumentChatCategories) =>
    set(state => ({
      ...state,
      currentCategory: category,
    })),
  setChats: (chats: DocumentChat[]) =>
    set(state => ({
      ...state,
      documentChats: chats,
    })),
  setCurrentChatId: (chatId: string | null) =>
    set(state => ({
      ...state,
      currentChatId: chatId,
    })),
  setAllChatsLoading: (isLoading: boolean) =>
    set(state => ({
      ...state,
      isAllChatsLoading: isLoading,
    })),
  deleteChat: (chatId: string) => {
    set(state => ({
      ...state,
      documentChats: state.documentChats.filter(chat => chat._id !== chatId),
    }));
  },
  addChat: (chat: DocumentChat) => {
    set(state => ({
      ...state,
      documentChats: [...state.documentChats, chat],
    }));
  },
  setCurrentStep: (step: DocumentChatSteps) =>
    set(state => ({
      ...state,
      currentStep: step,
    })),
  reset: () =>
    set(() => ({
      ...initialValues,
    })),
}));
