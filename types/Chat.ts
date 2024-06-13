import { Message } from 'react-native-vercel-ai';

export interface Session {
  id: string;
  sessionId?: string;
  userId: string;
  messages: Message[];
}
