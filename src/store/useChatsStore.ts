import { Session } from 'types/Chat';
import { create } from 'zustand';

interface ChatsState {
  chats: Session[];
  setChats: (chats: Session[]) => void;
  addChat: (chat: Session) => void;
}

export const useChatsStore = create<ChatsState>()(set => ({
  chats: [],
  setChats: chats => set({ chats }),
  addChat: chat => set(state => ({ chats: [chat, ...state.chats] })),
}));
