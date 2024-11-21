import { ChatForDrawer } from 'types/Chat';
import { create } from 'zustand';

type State = {
  chats: ChatForDrawer[];
  currentChatId: string | null;
  isSessionStarted: boolean;
  isChatsLoading: boolean;
  isLeaveModalVisible: boolean;
  navCallback: Function | null;
  isDeleteModalVisible: boolean;
  deleteCallback: Function | null;
};

type Actions = {
  setIsChatsLoading: (loading: boolean) => void;
  setDeleteCallback: (cb: Function | null) => void;
  setIsDeleteModalVisible: (visible: boolean) => void;
  setChatSessionStartedAfterCreationToFalse: (id: string) => void;
  setNavCallback: (cb: Function | null) => void;
  setIsLeaveModalVisible: (visible: boolean) => void;
  setSessionStarted: (started: boolean) => void;
  setChats: (chats: ChatForDrawer[]) => void;
  addChat: (chat: ChatForDrawer) => void;
  setCurrentChatId: (chatId: string | null) => void;
  removeChat: (chatId: string) => void;
  reset: () => void;
};

type ChatsState = State & Actions;

const initialValues: State = {
  chats: [],
  isDeleteModalVisible: false,
  currentChatId: null,
  isChatsLoading: false,
  isSessionStarted: false,
  isLeaveModalVisible: false,
  navCallback: null,
  deleteCallback: null,
};

export const useChatsStore = create<ChatsState>()(set => ({
  ...initialValues,
  setIsChatsLoading: loading => set({ isChatsLoading: loading }),
  setChatSessionStartedAfterCreationToFalse: id =>
    set(state => ({
      chats: state.chats.map(chat =>
        chat.chatId === id
          ? { ...chat, sessionStartedAfterCreation: false }
          : chat,
      ),
    })),
  setDeleteCallback: cb => set({ deleteCallback: cb }),
  setIsDeleteModalVisible: visible => set({ isDeleteModalVisible: visible }),
  setNavCallback: cb => set({ navCallback: cb }),
  setIsLeaveModalVisible: visible => set({ isLeaveModalVisible: visible }),
  setSessionStarted: started => set({ isSessionStarted: started }),
  setChats: chats => set({ chats }),
  setCurrentChatId: chatId => set({ currentChatId: chatId }),
  addChat: chat => set(state => ({ chats: [...state.chats, chat] })),
  removeChat: chatId =>
    set(state => ({
      chats: state.chats.filter(chat => chat.chatId !== chatId),
    })),
  reset: () =>
    set(() => ({
      ...initialValues,
    })),
}));
