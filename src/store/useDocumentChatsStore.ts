import { Message } from 'types/Chat';
import { create } from 'zustand';

type DocumentChat = {
  _id: string;
  userId: string;
  messages: Message[];
  chatName: string;
};

type State = {
  documentChats: DocumentChat[];
};

type Actions = {
  setChats: (chats: DocumentChat[]) => void;
  addChat: (chat: DocumentChat) => void;
  deleteChat: (chatId: string) => void;
  reset: () => void;
};

const initialValues: State = {
  documentChats: [],
};

type DocumentChatState = State & Actions;

export const useDocumentChatStore = create<DocumentChatState>()(set => ({
  ...initialValues,
  setChats: (chats: DocumentChat[]) =>
    set(state => ({
      ...state,
      documentChats: chats,
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
  reset: () =>
    set(() => ({
      ...initialValues,
    })),
}));
