import image from '@common/assets/images';
import {
  ChatCategories,
  ChatCategoriesEnum,
} from '@store/useCategorizedChatFlowStore';
import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/Chat';

import { generateUUID } from './generateUUID';

export const SYSTEM_USER = {
  _id: 'DR_MICHAEL',
  name: 'מיכאל',
  avatar: image('michael_chat'),
} as const;

export const CLIENT_USER = {
  _id: 'USER',
  name: 'אני',
} as const;

const getBasicMessage = (name: string, gender: 'M' | 'F') => {
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

const SHORT_FIRST_MESSAGE = {
  [ChatCategoriesEnum.BAD_HABITS]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי היי${name}, אני מיכאל 🤗  
        
שמח לראות אותך כאן שוב!
  
רוצה להמשיך לעבוד על שינוי הרגלים, או שאולי יש משהו חדש שתרצה/י לשתף?
  
אני כאן בשבילך.`,
      },
    ];
  },
  [ChatCategoriesEnum.NEGATIVE]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗  
        
איזה כיף שחזרת!
  
אפשר להמשיך לדבר על דפוסי החשיבה שלך, או לשתף אותי במשהו חדש שמעסיק אותך.
  
מה תרצה/י שנחקור יחד היום?`,
      },
    ];
  },
  [ChatCategoriesEnum.ANXIETY]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗  
        
שמח לראות אותך שוב!
  
אפשר להמשיך לדבר על החרדה שלך, או לשתף בתחושות חדשות שהתעוררו.
  
איך אוכל לעזור לך היום?`,
      },
    ];
  },
  [ChatCategoriesEnum.SELF_DEV]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗  
        
איזה יופי שחזרת!
  
נוכל להמשיך לעבוד על ההתפתחות האישית שלך, או לדבר על משהו חדש שחשוב לך.
  
מה בתוכנית שלך להיום?`,
      },
    ];
  },
};

const FIRST_MESSAGE = {
  [ChatCategoriesEnum.BAD_HABITS]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗
        
אני שמח שבחרת לעבוד על שינוי הרגלים שמפריעים לך. יחד נחקור את שורשי ההרגלים האלו ונפתח אסטרטגיות יעילות להחלפתם בהרגלים בריאים יותר.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `כדי להתחיל, אנא שתף/י איתי:

1. מהם ההרגלים הספציפיים שהיית רוצה לשנות ואיך הם משפיעים על חייך?

2. מה לדעתך הסיבות העמוקות שגורמות לך לחזור על ההרגלים האלה?

3. באילו דרכים ניסית להתמודד עם ההרגלים בעבר ומה עבד או לא עבד?`,
      },
    ];
  },
  [ChatCategoriesEnum.ANXIETY]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗 

אני מבין כמה אומץ דרוש כדי להתמודד עם חרדה ואני כאן כדי לתמוך בך. ביחד נחקור את הגורמים לחרדה שלך ונפתח אסטרטגיות יעילות להפחתת החרדה ולשיפור איכות החיים.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `כדי להתחיל, אנא שתף/י איתי:

1.⁠ באילו מצבים את/ה חווה את חרדה? 

2. אילו תסמינים פיזיים ורגשיים את/ה מרגיש/ה כשהחרדה מגיעה?

3. מה עוזר לך להירגע כשאת/ה בשיא החרדה?`,
      },
    ];
  },
  [ChatCategoriesEnum.NEGATIVE]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗

אני מעריך את הנכונות שלך לעבוד על שינוי דפוסי המחשבה השליליים. ביחד נלמד לזהות את המחשבות האוטומטיות המזיקות ולהחליף אותן בחשיבה מועילה ומעצימה יותר.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `כדי להתחיל, ספר/י לי בבקשה:

1. מהן המחשבות השליליות הנפוצות ביותר שחולפות בראשך ובאילו מצבים הן צצות?

2. כיצד המחשבות השליליות האלו משפיעות על הרגשתך ועל ההתנהגות שלך?`,
      },
    ];
  },
  [ChatCategoriesEnum.SELF_DEV]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `היי ${name}, אני מיכאל 🤗

כל הכבוד על ההחלטה לקחת את ההתפתחות האישית שלך לשלב הבא! אני נרגש ללוות אותך במסע לממש את הפוטנציאל שלך ולהגשים את המטרות האישיות שלך.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `כדי להתחיל, אנא שתף/י איתי:

1. מהן שלוש המטרות החשובות ביותר שלך כרגע בחיים האישיים או המקצועיים?

2. מהם האתגרים או המכשולים העיקריים שמונעים ממך להגיע ליעדים שלך?`,
      },
    ];
  },
};

const getFirstMsgArr = (
  name: string,
  category: ChatCategoriesEnum,
  chatsLength: number,
) => {
  if (chatsLength) {
    return SHORT_FIRST_MESSAGE[category](name);
  }
  return FIRST_MESSAGE[category](name);
};

export const getFirstMsgs = (
  name: string,
  gender: 'M' | 'F',
  category: ChatCategories,
  chatsLength: number,
): IMessage[] => {
  if (!category) {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: getBasicMessage(name, gender),
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
  }
  return getFirstMsgArr(name, category, chatsLength);
};

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
