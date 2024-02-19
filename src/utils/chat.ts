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
} as const;

export const FIRST_MESSAGES: IMessage[] = [
  // @ts-ignore
  {
    _id: 'intro_system',
    user: SYSTEM_USER,
    createdAt: new Date(),
    text: `היי 👋 אני מיכאל, כאן כדי לעזור לך.

אני יודע שלחץ וחרדה יכולים להיות קשים, אך אני כאן לתמוך בך - נלמד טכניקות מיינדפולנס, נתמודד עם מחשבות ורגשות ונמצא מדיטציות מותאמות אישית לעזור לך להירגע ולהרגיש בשליטה. 🧘
    
איך את/ה מרגיש/ה היום?`,
  },
  // @ts-ignore
  {
    _id: 'intro',
    user: CLIENT_USER,
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'תוכל להמליץ לי על מדיטציה? 🧘',
          value: 'learn_to_meditate',
        },
        {
          title: 'מהם היתרונות של מדיטציה? ✨',
          value: 'benefits_of_meditation',
        },
        {
          title: 'המוח שלי עסוק מדי במהלך מדיטציה - איך מתמודדים עם זה? 🧠',
          value: 'busy_mind_during_meditation',
        },
        {
          title: 'אני דואג בגלל המלחמה 😟',
          value: 'advanced_meditation',
        },
      ],
    },
  },
];

export function removeEmojiesFromString(str: string) {
  return str.replace(/🚀|✨|🧘|😟|🧠|🆙/g, '');
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
