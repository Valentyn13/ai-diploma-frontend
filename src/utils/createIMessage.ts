import { IMessage } from 'react-native-gifted-chat';

import { mapMessageToIMessage } from './chat';

const createIMessage = (
  message: string,
  role: 'user' | 'assistant' | 'system',
): IMessage => {
  const newMessage = {
    id: Date.now().toString(),
    _id: Date.now().toString(),
    content: message,
    role,
    timestamp: new Date().toISOString(),
  };
  const convertedMessage = mapMessageToIMessage(newMessage);

  return convertedMessage;
};

export default createIMessage;
