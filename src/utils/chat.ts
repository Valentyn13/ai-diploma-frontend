import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'react-native-vercel-ai';

export const SYSTEM_USER = {
  _id: 'DR_MICHAEL',
  name: 'מיכאל',
  avatar:
    'https://doodleipsum.com/700/avatar-3?i=74943b7fc5a9da2affe8c2d8b8558812',
} as const;

export const CLIENT_USER = {
  _id: 'USER',
  name: 'אני',
  avatar:
    'https://doodleipsum.com/700/avatar-3?i=74943b7fc5a9da2affe8c2d8b8558812',
} as const;

export const FIRST_MESSAGES: IMessage[] = [
  // @ts-ignore
  {
    _id: 'intro_system',
    system: true,
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
  return str.replace(
    /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FB00}-\u{1FBFF}\u{1FC00}-\u{1FCFF}]/gu,
    '',
  );
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
