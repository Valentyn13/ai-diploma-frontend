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
}

export type ChatForDrawer = {
  chatId: string;
  needStreaming: boolean;
  firstMessageContent: string;
  firstMessageTimestamp: string;
};
