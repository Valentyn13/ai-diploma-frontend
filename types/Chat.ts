import { ChatCategories } from '@store/useCategorizedChatFlowStore';

export type Message = {
  id: string;
  _id?: string;
  content: string;
  role: 'system' | 'user' | 'assistant';
  timestamp: string;
};

export interface Session {
  _id: string;
  sessionId?: string;
  userId: string;
  messages: Message[];
  category?: ChatCategories;
}

export type ChatForDrawer = {
  sessionStartedAfterCreation?: boolean;
  chatId: string;
  firstMessageContent: string;
  firstMessageTimestamp: string;
  category?: ChatCategories;
  updatedAt: string;
};
