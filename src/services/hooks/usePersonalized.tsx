import { PersonalizedLabel } from '@common/components/Personalized';
import { getPeriodOfDay } from '@utils/time';

import useSessions from './useSessions';
import { useUser } from './useUser';

// meds
//   .filter(({ id, personalizd }) => !!id && personalizd.length)
//   .map(({ id, name, personalizd, duration }) => ({
//     id,
//     name,
//     personalizd,
//     duration,
//   }))
//   .map(({ personalizd, ...item }) => ({
//     ...item,
//     personalized: personalizd.split(', '),
//   }));

const MAPPING: {
  id: string;
  name: string;
  duration: number;
  personalized: PersonalizedLabel[];
}[] = [
  {
    id: '5eca520c10fe0480d350c98e',
    name: 'לישון טוב',
    duration: 520,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '63c0efce2c4099bc0e36e44f',
    name: 'רגיעה',
    duration: 628,
    personalized: ['להוריד פאניקה', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '64bf65afe361a71983a5f3ad',
    name: 'תחילת היום',
    duration: 420,
    personalized: ['פשוט לתרגל'],
  },
  {
    id: '64daea785d57908b4359d27a',
    name: 'שחרור היום',
    duration: 438,
    personalized: ['לשחרר לחצים', 'פשוט לתרגל'],
  },
  {
    id: '63c0edd62c4099bc0e36e441',
    name: 'לפני שינה (קצר)',
    duration: 385,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '65093d7d1d1970cfe5ebe388',
    name: 'רגיעה עמוקה',
    duration: 600,
    personalized: ['להוריד פאניקה', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '64d2f01242357e4b9d18fe36',
    name: 'שחרור לחצים',
    duration: 630,
    personalized: ['להוריד פאניקה', 'לשחרר לחצים'],
  },
  {
    id: '654c74b8ba86f01d58165692',
    name: 'הפגת חרדות ולחצים',
    duration: 810,
    personalized: ['להוריד פאניקה', 'לשחרר לחצים'],
  },
  {
    id: '6437c1ddc90514876f526229',
    name: 'התקרקעות ושלווה',
    duration: 300,
    personalized: ['למצוא שלווה פנימית', 'לשחרר לחצים', 'פשוט לתרגל'],
  },
  {
    id: '650bf86a1d1970cfe5ebe38d',
    name: 'וויסות מערכת העצבים',
    duration: 600,
    personalized: ['וויסות רגשות'],
  },
  {
    id: '654c755bba86f01d58165694',
    name: 'מדיטציה להרדמות',
    duration: 600,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '6486c18d0e66f2955d2ecbc0',
    name: 'פתיחת יום',
    duration: 780,
    personalized: ['פשוט לתרגל'],
  },
  {
    id: '6537b2be092f89755aeb9016',
    name: 'נוכחות',
    duration: 780,
    personalized: ['לתפוס פוקוס', 'פשוט לתרגל'],
  },
  {
    id: '638edb9e132405bcd302f6c1',
    name: 'הרפייה עמוקה',
    duration: 1760,
    personalized: ['וויסות רגשות', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '643fa94789ea3102dfe03b2e',
    name: 'הכרת תודה',
    duration: 960,
    personalized: ['הכרת תודה', 'לפתח חמלה עצמית'],
  },
  {
    id: '5eca520c10fe0480d350c9a6',
    name: 'ריכוז',
    duration: 273,
    personalized: ['לתפוס פוקוס'],
  },
  {
    id: '6471b01a538c7fe78164398a',
    name: 'דימיון מודרך לרוגע',
    duration: 720,
    personalized: [
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '6437c209c90514876f52622a',
    name: 'התנעת יום',
    duration: 350,
    personalized: ['תחילת יום'],
  },
  {
    id: '650bfc401d1970cfe5ebe393',
    name: 'מדיטציה ליום חדש',
    duration: 600,
    personalized: ['תחילת יום'],
  },
  {
    id: '64f57470d1342603f4d29cf9',
    name: 'רגשות שליליים',
    duration: 300,
    personalized: ['וויסות רגשות'],
  },
  {
    id: '64fd6d0fc1bd701354997f99',
    name: 'שחרור כעסים',
    duration: 600,
    personalized: ['הפחתת עצבים'],
  },
  {
    id: '6556ed29ef4c61fb4c3d8090',
    name: 'מדיטציית בוקר',
    duration: 420,
    personalized: ['תחילת יום'],
  },
  {
    id: '63c0ef0b2c4099bc0e36e448',
    name: 'תרגול מיינדפולנס',
    duration: 540,
    personalized: ['פשוט לתרגל', 'תחילת יום'],
  },
  {
    id: '5eca520c10fe0480d350c994',
    name: 'חרדה',
    duration: 512,
    personalized: ['הפחתת חרדה'],
  },
  {
    id: '65879889887bd0b4c6e5f7af',
    name: 'הוכרת תודה',
    duration: 680,
    personalized: ['הכרת תודה'],
  },
  {
    id: '644fc3948b29c767b4e6b66f',
    name: 'הרפיית שרירים',
    duration: 540,
    personalized: ['וויסות רגשות', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '655707abef4c61fb4c3d8091',
    name: 'רגע של מיינדפולנס',
    duration: 300,
    personalized: ['פשוט לתרגל'],
  },
  {
    id: '6581265e887bd0b4c6e5f7a8',
    name: 'פתיחת הלב',
    duration: 630,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '644fc4398b29c767b4e6b671',
    name: 'נשימה להרגעת חרדה',
    duration: 390,
    personalized: ['הפחתת חרדה'],
  },
  {
    id: '64045fdb420a84635493a7f4',
    name: 'מדיטציית בוקר',
    duration: 426,
    personalized: ['תחילת יום'],
  },
  {
    id: '6565b79e253db951b9a34f44',
    name: 'מדיטציית נוכחות למתקדמים',
    duration: 600,
    personalized: ['פשוט לתרגל'],
  },
  {
    id: '5eca520c10fe0480d350c990',
    name: 'אמצע הלילה',
    duration: 464,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '5eca520c10fe0480d350c9aa',
    name: 'בוסט אנרגיה',
    duration: 210,
    personalized: ['לתפוס פוקוס', 'תחילת יום'],
  },
  {
    id: '64bb80efb8394af97a9c0c0b',
    name: 'ריפוי הילד הפנימי',
    duration: 1080,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '6444f9d689ea3102dfe03b3d',
    name: 'רגש שלילי',
    duration: 300,
    personalized: ['וויסות רגשות'],
  },
  {
    id: '64cb0fe7aea62fc674dbcdd0',
    name: 'מדיטציית תחושות גוף',
    duration: 1080,
    personalized: ['למצוא שלווה פנימית', 'לשחרר לחצים', 'פשוט לתרגל'],
  },
  {
    id: '63a90bfe49d0f8f7db26dc21',
    name: 'קבלה',
    duration: 600,
    personalized: ['וויסות רגשות', 'למצוא שלווה פנימית', 'לפתח חמלה עצמית'],
  },
  {
    id: '64954c1c0e66f2955d2ecbed',
    name: 'מיינדפולנס',
    duration: 540,
    personalized: ['הפחתת חרדה', 'לשחרר לחצים', 'פשוט לתרגל', 'תחילת יום'],
  },
  {
    id: '648ff7420e66f2955d2ecbd5',
    name: 'הוכרת תודה',
    duration: 624,
    personalized: ['הכרת תודה'],
  },
  {
    id: '64046109420a84635493a7fe',
    name: 'מתח',
    duration: 360,
    personalized: ['לשחרר לחצים'],
  },
  {
    id: '63aa61c65fbca84d76752332',
    name: 'מדיטציית רגש',
    duration: 540,
    personalized: ['וויסות רגשות'],
  },
  {
    id: '63b3fb8ae6e4abaf47376671',
    name: 'אהבה עצמית',
    duration: 690,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '5eca520c10fe0480d350c993',
    name: 'פחד',
    duration: 400,
    personalized: ['להוריד פאניקה'],
  },
  {
    id: '64b74b85b8394af97a9c0c00',
    name: "תרגול הו'אופונופונו",
    duration: 780,
    personalized: ['למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '6495427e0e66f2955d2ecbe4',
    name: 'דימיון מודרך להרגעה',
    duration: 720,
    personalized: [
      'הפחתת חרדה',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '62bd6c670888f539f97d85d0',
    name: 'סריקת גוף 2#',
    duration: 1200,
    personalized: ['למצוא שלווה פנימית', 'לשחרר לחצים', 'פשוט לתרגל'],
  },
  {
    id: '64afe19abe04cd664e5f819e',
    name: 'ריפוי הילד הפנימי',
    duration: 1080,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '63aa683e5fbca84d7675233c',
    name: 'תרגול בסיסי',
    duration: 570,
    personalized: ['פשוט לתרגל'],
  },
  {
    id: '630b5093f77053953f6e6595',
    name: 'פתיחת יום',
    duration: 624,
    personalized: ['תחילת יום'],
  },
  {
    id: '64b393d9be04cd664e5f81a3',
    name: 'מדיטציה לסליחה',
    duration: 720,
    personalized: ['למצוא שלווה פנימית', 'לפתח חמלה עצמית'],
  },
  {
    id: '649543530e66f2955d2ecbe6',
    name: 'קבלה וחמלה עצמית',
    duration: 420,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '649546820e66f2955d2ecbea',
    name: 'סטרס',
    duration: 360,
    personalized: ['לשחרר לחצים'],
  },
  {
    id: '5eca520c10fe0480d350c992',
    name: 'עצבות',
    duration: 323,
    personalized: ['הכרת תודה', 'וויסות רגשות'],
  },
  {
    id: '62bd72d20888f539f97d85eb',
    name: 'מיקוד באובייקט',
    duration: 780,
    personalized: ['הפחתת חרדה', 'לתפוס פוקוס', 'פשוט לתרגל'],
  },
  {
    id: '63b3fee0e6e4abaf47376678',
    name: 'הוקרת תודה',
    duration: 690,
    personalized: ['הכרת תודה'],
  },
  {
    id: '649541d00e66f2955d2ecbe3',
    name: 'חמלה עצמית',
    duration: 1020,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '6482034d0e66f2955d2ecbb9',
    name: 'קבלה וחמלה עצמית',
    duration: 420,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '61a8c296c9ff5226651bfcd8',
    name: 'לפני יום עבודה',
    duration: 348,
    personalized: ['תחילת יום'],
  },
  {
    id: '6474aba2289563e63c577f8e',
    name: 'תרגול באהבה עצמית',
    duration: 740,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '648c0c220e66f2955d2ecbd1',
    name: 'רגש שלילי',
    duration: 300,
    personalized: ['וויסות רגשות'],
  },
  {
    id: '647d9494a09dc890566da73f',
    name: 'חמלה וקבלה עצמית',
    duration: 420,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '6305de394895116c4c65e0d5',
    name: 'מיקוד למתקדמים',
    duration: 844,
    personalized: ['פשוט לתרגל'],
  },
  {
    id: '5eca520c10fe0480d350c9a2',
    name: 'פאניקה',
    duration: 500,
    personalized: ['להוריד פאניקה'],
  },
  {
    id: '6444fa6489ea3102dfe03b3f',
    name: 'חיבור לילד הפנימי',
    duration: 350,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '6404605b420a84635493a7f6',
    name: 'חמלה כלפי עצמנו',
    duration: 800,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '643fd04089ea3102dfe03b34',
    name: 'חמלה עצמית',
    duration: 1020,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '6486c3290e66f2955d2ecbc1',
    name: 'רגע חדש',
    duration: 780,
    personalized: ['פשוט לתרגל', 'תחילת יום'],
  },
  {
    id: '63c0f06f2c4099bc0e36e458',
    name: 'פתיחת שבוע',
    duration: 360,
    personalized: ['תחילת יום'],
  },
  {
    id: '64954a480e66f2955d2ecbeb',
    name: 'עצבים',
    duration: 90,
    personalized: ['הפחתת עצבים'],
  },
  {
    id: '5eca520c10fe0480d350c9a1',
    name: 'עצבים',
    duration: 90,
    personalized: ['הפחתת עצבים'],
  },
  {
    id: '5eca520c10fe0480d350c9ab',
    name: 'בוסט ריכוז',
    duration: 300,
    personalized: ['לתפוס פוקוס'],
  },
  {
    id: '639b110473b17c70f878a685',
    name: 'סריקת גוף',
    duration: 1230,
    personalized: ['למצוא שלווה פנימית', 'לשחרר לחצים', 'פשוט לתרגל'],
  },
  {
    id: '639b135b73b17c70f878a68b',
    name: 'חידוד המיקוד',
    duration: 864,
    personalized: ['לתפוס פוקוס'],
  },
  {
    id: '659a1371c5b8e4f335e3ef8f',
    name: 'מדיטציה לרגיעה',
    duration: 790,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '65d5d5037f6b2aedaeb4ffb4',
    name: 'התמודדות עם חרדה',
    duration: 732,
    personalized: ['הפחתת חרדה'],
  },
  {
    id: '65dc263a150fa63e232be0e2',
    name: 'שליטה בתשומת הלב',
    duration: 420,
    personalized: ['לתפוס פוקוס'],
  },
];

const timeSlots = [1, 5, 10, 20, 30, 45, 60];

function getRangeInSeconds(index: number) {
  if (index < 0 || index >= timeSlots.length) {
    console.error('Index out of bounds');
    return null;
  }

  const start = index === 0 ? 0 : timeSlots[index - 1] * 60;
  const end = timeSlots[index] * 60;

  return [start, end];
}

export const usePersonalized = () => {
  const { user } = useUser();
  const { sessions } = useSessions();

  const getTitle = () => {
    const periodTime = getPeriodOfDay();

    if (periodTime === 'morning') {
      return 'בוקר טוב';
    } else if (periodTime === 'noon') {
      return 'צהריים טובים';
    } else if (periodTime === 'afternoon') {
      return 'אחר צהריים טובים';
    } else if (periodTime === 'evening') {
      return 'ערב טוב';
    } else {
      return 'לילה טוב';
    }
  };

  const getSubtitle = () => {
    const periodTime = getPeriodOfDay();

    if (periodTime === 'morning') {
      return user.sex === 'M'
        ? 'התחל את היום בצורה נכונה'
        : 'התחילי את היום בצורה נכונה';
    } else if (periodTime === 'noon') {
      return user.sex === 'M' ? 'קח לך רגע לעצמך' : 'קחי לך רגע לעצמך';
    } else if (periodTime === 'afternoon') {
      return user.sex === 'M'
        ? 'הפסקה קטנה באמצע היום'
        : 'הפסקה קטנה באמצע היום';
    } else if (periodTime === 'evening') {
      return user.sex === 'M'
        ? 'הירגע לפני שהיום נגמר'
        : 'הירגעי לפני שהיום נגמר';
    } else {
      return user.sex === 'M'
        ? 'התחל את הלילה בשלווה לתודעה'
        : 'התחילי את הלילה בשלווה לתודעה';
    }
  };

  const pickSession = (personalized: PersonalizedLabel, step: number) => {
    const filteredSessions = getSessionIdsByStateAndTime(personalized, step);
    const randomSessionId =
      filteredSessions[Math.floor(Math.random() * filteredSessions.length)];

    return sessions.find(s => s.id === randomSessionId)!;
  };

  const getSessionIdsByStateAndTime = (
    personalized: PersonalizedLabel,
    step: number,
  ) => {
    const [start, end] = getRangeInSeconds(step)!;

    return MAPPING.filter(
      s =>
        s.personalized.includes(personalized) &&
        s.duration >= start &&
        s.duration <= end,
    ).map(({ id }) => id);
  };

  return { getSessionIdsByStateAndTime, pickSession, getTitle, getSubtitle };
};
