import image from '@common/assets/images';
import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/Chat';

import { generateUUID } from './generateUUID';

export const SYSTEM_USER = {
  _id: 'DR_MICHAEL',
  name: 'מיכאל',
  avatar: image('michael_2'),
} as const;

export const CLIENT_USER = {
  _id: 'USER',
  name: 'אני',
} as const;

const getFirstMsg = (name: string, gender: 'M' | 'F') => {
  if (gender === 'M') {
    return `היי ${name}, אני מיכאל 🤗

אני שמח שבחרת לשתף אותי במחשבות ובתחושות שלך. אני כאן להקשיב, לתמוך ולעזור לך לגלות תובנות חדשות על עצמך.

כדי שנוכל לנהל שיחה משמעותית ומועילה:
•⁠  ⁠שתף אותי בהרחבה - ככל שאדע יותר, כך אוכל להבין ולעזור טוב יותר.
•⁠  ⁠הסבר את ההקשר - זה יאפשר לי לתת לך תשובות רלוונטיות ומדויקות.
•⁠  ⁠אל תהסס לשאול או להבהיר - זה יעזור לנו להעמיק את השיחה.

זכור, אני כאן כדי לתמוך ולייעץ, אך איני מחליף טיפול מקצועי.
לכל שיחה יש לנו 50 הודעות, אך תמיד נוכל להמשיך בשיחה חדשה!`;
  }

  return `היי ${name}, אני מיכאל 🤗

אני שמח שבחרת לשתף אותי במחשבות ובתחושות שלך. אני כאן להקשיב, לתמוך ולעזור לך לגלות תובנות חדשות על עצמך.

כדי שנוכל לנהל שיחה משמעותית ומועילה:
•⁠  ⁠שתפי אותי בהרחבה - ככל שאדע יותר, כך אוכל להבין ולעזור טוב יותר.
•⁠  ⁠הסבירי את ההקשר - זה יאפשר לי לתת לך תשובות רלוונטיות ומדויקות.
•⁠  ⁠אל תהססי לשאול או להבהיר - זה יעזור לנו להעמיק את השיחה.

זכרי, אני כאן כדי לתמוך ולייעץ, אך איני מחליף טיפול מקצועי.
לכל שיחה יש לנו 50 הודעות, אך תמיד נוכל להמשיך בשיחה חדשה!`;
};

export const getFirstMsgs = (name: string, gender: 'M' | 'F'): IMessage[] => [
  // @ts-ignore
  {
    _id: 'intro_system',
    user: SYSTEM_USER,
    createdAt: new Date(),
    text: getFirstMsg(name, gender),
  },
  {
    _id: 'intro_system_2',
    user: SYSTEM_USER,
    createdAt: new Date(),
    text: `אז ${
      gender === 'M' ? 'ספר' : 'ספרי'
    } לי, מה מעסיק אותך היום? אני כאן, מקשיב ומוכן לעזור✨`,
  },
];

export const mapMessageToIMessage = (message: Message): IMessage => {
  return {
    _id: message._id || generateUUID(),
    text: message.content,
    createdAt: new Date(message.timestamp),
    user: message.role === 'user' ? { _id: 'USER' } : SYSTEM_USER,
  };
};

export const mapIMessageToMessage = (message: IMessage): Message => {
  return {
    id: message._id as string,
    content: message.text,
    timestamp: message.createdAt.toString(),
    role: message.user._id === 'USER' ? 'user' : 'assistant',
  };
};
