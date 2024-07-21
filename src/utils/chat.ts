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
    text: `היי, אני מיכאל 👋

אני כאן כדי להקשיב, לתמוך ולהציע פרספקטיבות חדשות - בדיוק כמו חבר טוב. אבל חשוב לזכור:
- אני לא מחליף טיפול מקצועי, אלא כלי עזר.
- ⁠בכל שיחה נוכל להחליף עד 40 הודעות. אם נרצה להמשיך לדבר, פשוט תפתח.י שיחה חדשה!
- ככל שתשתף.י איתי יותר, אוכל לתת לך תובנות מועילות יותר!

אז בואו נתחיל - מה הנושא שהכי מעסיק אותך כרגע?`,
  },
  // @ts-ignore
  {
    _id: 'intro',
    user: CLIENT_USER,
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'למה קשה לי להירדם בלילה? 🥱',
          value: 'sleeping_problems',
        },
        {
          title: 'אני רוצה המלצה למדיטציה 🧘',
          value: 'learn_to_meditate',
        },
        {
          title: 'איך לשחרר מחשבה שלילית? 🤔',
          value: 'negative_thoughts',
        },
        {
          title: 'אני רוצה לשתף משהו 😳',
          value: 'share_feelings',
        },
      ],
    },
  },
];

export function removeEmojiesFromString(str: string) {
  return str.slice(0, str.length - 3);
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
