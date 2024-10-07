import { ChatForDrawer } from 'types/Chat';
import { create } from 'zustand';

interface ChatsState {
  chats: ChatForDrawer[];
  currentChatId: string | null;
  setChats: (chats: ChatForDrawer[]) => void;
  addChat: (chat: ChatForDrawer) => void;
  setCurrentChatId: (chatId: string | null) => void;
  updateChatStreaming: (chatId: string | null) => void;
  removeChat: (chatId: string) => void;
}

export const useChatsStore = create<ChatsState>()(set => ({
  chats: [],
  currentChatId: null,
  setChats: chats => set({ chats }),
  setCurrentChatId: chatId => set({ currentChatId: chatId }),
  addChat: chat => set(state => ({ chats: [...state.chats, chat] })),
  removeChat: chatId =>
    set(state => ({
      chats: state.chats.filter(chat => chat.chatId !== chatId),
    })),
  updateChatStreaming: chatId =>
    set(state => ({
      chats: state.chats.map(chat => {
        if (chat.chatId === chatId) {
          return {
            ...chat,
            needStreaming: false,
          };
        }
        return chat;
      }),
    })),
}));
