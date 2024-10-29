import { ChatForDrawer } from 'types/Chat';
import { create } from 'zustand';

interface ChatsState {
  chats: ChatForDrawer[];
  currentChatId: string | null;
  isSessionStarted: boolean;
  isLeaveModalVisible: boolean;
  navCallback: Function | null;
  setChatSessionStartedAfterCreationToFalse: (id: string) => void;
  setNavCallback: (cb: Function | null) => void;
  setIsLeaveModalVisible: (visible: boolean) => void;
  setSessionStarted: (started: boolean) => void;
  setChats: (chats: ChatForDrawer[]) => void;
  addChat: (chat: ChatForDrawer) => void;
  setCurrentChatId: (chatId: string | null) => void;
  removeChat: (chatId: string) => void;
}

export const useChatsStore = create<ChatsState>()(set => ({
  chats: [],
  currentChatId: null,
  isSessionStarted: false,
  isLeaveModalVisible: false,
  navCallback: null,
  setChatSessionStartedAfterCreationToFalse: id =>
    set(state => ({
      chats: state.chats.map(chat =>
        chat.chatId === id
          ? { ...chat, sessionStartedAfterCreation: false }
          : chat,
      ),
    })),
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
}));
