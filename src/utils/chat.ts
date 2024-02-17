import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'react-native-vercel-ai';

export const SYSTEM_USER = {
  _id: 'DR_MICHAEL',
  name: 'מיכאל',
  avatar: 'https://rega.co.il/images/michael.png',
} as const;

export const CLIENT_USER = {
  _id: 'USER',
  name: 'אני',
  avatar: 'https://rega.co.il/images/michael.png',
} as const;

export const FIRST_MESSAGES: IMessage[] = [
  // @ts-ignore
  {
    _id: 'intro_system',
    user: SYSTEM_USER,
    text: 'שלום! אני מיכאל, אני כאן כדי לעזור לך במסע 🧘',
  },
  // @ts-ignore
  {
    _id: 'intro',
    user: CLIENT_USER,
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'אני רוצה להתחיל את המסע שלי! איך אני מתחיל/ה? 🚀',
          value: 'learn_to_meditate',
        },
        {
          title: 'אשמח לדעת מהם היתרונות של מדיטציה ✨',
          value: 'benefits_of_meditation',
        },
        {
          title: 'המוח שלי עסוק מדי במהלך מדיטציה - איך אני מתמודד/ת עם זה? 🧠',
          value: 'busy_mind_during_meditation',
        },
        {
          title: 'מחפש/ת אתגר מדיטציה חדש? בוא/י נעלה רמה! 🆙',
          value: 'advanced_meditation',
        },
        {
          title: 'אני זקוק/ה לעזרה נוספת',
          value: 'contact_expert',
        },
      ],
    },
  },
];

export function removeEmojiesFromString(str: string) {
  return str.replace(/🚀|✨|🧠|🆙/g, '');
}

export const mapMessageToIMessage = (message: Message): IMessage => {
  return {
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.createdAt || new Date()),
    user: message.role === 'user' ? { _id: 'USER' } : SYSTEM_USER,
  };
};

export const mapIMessageToMessage = (message: IMessage): Message => {
  return {
    id: message._id.toString(),
    content: message.text,
    createdAt: new Date(message.createdAt),
    role: message.user._id === 'USER' ? 'user' : 'system',
  };
};
