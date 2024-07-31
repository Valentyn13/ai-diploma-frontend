import { PERSONALIZED_STATES, TIME_SLOTS } from '@common/constants';
import { shuffleArray } from '@utils/rand';
import { getPeriodOfDay } from '@utils/time';
import { PersonalizedLabel } from 'types/Personalized';

import useSessions from './useSessions';
import { useUser } from './useUser';

// meds
//   .filter(({ id, personalized }) => !!id && personalized.length)
//   .map(({ id, name, personalized, duration }) => ({
//     id,
//     name,
//     personalized,
//     duration,
//   }))
//   .map(({ personalized, ...item }) => ({
//     ...item,
//     personalized: personalized.split(', '),
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
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'עזרה בלהירדם',
      'פשוט לתרגל',
    ],
  },
  {
    id: '64bf65afe361a71983a5f3ad',
    name: 'תחילת היום',
    duration: 420,
    personalized: ['פשוט לתרגל', 'תחילת יום'],
  },
  {
    id: '64daea785d57908b4359d27a',
    name: 'שחרור היום',
    duration: 438,
    personalized: [
      'הפחתת עצבים',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'פשוט לתרגל',
    ],
  },
  {
    id: '63c0edd62c4099bc0e36e441',
    name: 'לפני שינה (קצר)',
    duration: 385,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '643c1650bb731339805e903f',
    name: 'מחשבות טורדניות',
    duration: 900,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'לשחרר לחצים',
    ],
  },
  {
    id: '65093d7d1d1970cfe5ebe388',
    name: 'רגיעה עמוקה',
    duration: 600,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '63c50030c1ab3549d358c3d4',
    name: 'התמודדות עם מתח וחרדה',
    duration: 796,
    personalized: ['הפחתת חרדה', 'לשחרר לחצים'],
  },
  {
    id: '64d2f01242357e4b9d18fe36',
    name: 'שחרור לחצים',
    duration: 630,
    personalized: [
      'הפחתת חרדה',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '654c74b8ba86f01d58165692',
    name: 'הפגת חרדות ולחצים',
    duration: 810,
    personalized: [
      'הפחתת חרדה',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
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
    personalized: [
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'לשחרר לחצים',
    ],
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
    personalized: ['פשוט לתרגל', 'תחילת יום'],
  },
  {
    id: '6537b2be092f89755aeb9016',
    name: 'נוכחות',
    duration: 780,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '643c1600bb731339805e903e',
    name: 'דימיון מודרך',
    duration: 550,
    personalized: ['הפחתת חרדה', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
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
      'הפחתת חרדה',
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
    id: '657147d0042258f6bc2d20a9',
    name: 'שחרור מחשבות רעות',
    duration: 560,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '648b02160e66f2955d2ecbcc',
    name: 'מוזיקה להירדמות',
    duration: 1800,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '64b8d419b8394af97a9c0c04',
    name: 'מוזיקת תדרים לריכוז',
    duration: 3600,
    personalized: ['לתפוס פוקוס'],
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
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
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
    personalized: ['לתפוס פוקוס', 'פשוט לתרגל'],
  },
  {
    id: '649545120e66f2955d2ecbe9',
    name: 'מחשבות לפני שינה',
    duration: 766,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '5eca520c10fe0480d350c98d',
    name: 'מחשבות',
    duration: 766,
    personalized: ['עזרה בלהירדם'],
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
    personalized: [
      'הפחתת חרדה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '648ff7420e66f2955d2ecbd5',
    name: 'הוכרת תודה',
    duration: 624,
    personalized: ['הכרת תודה'],
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
    id: '6476e8a8289563e63c577f96',
    name: 'נשימה מרובעת',
    duration: 60,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
    ],
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
      'הפחתת עצבים',
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
    id: '6476f6c4289563e63c577f97',
    name: 'נשימה מעגלית',
    duration: 60,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
    ],
  },
  {
    id: '64b393d9be04cd664e5f81a3',
    name: 'מדיטציה לסליחה',
    duration: 720,
    personalized: ['למצוא שלווה פנימית', 'לפתח חמלה עצמית'],
  },
  {
    id: '6476f6f3289563e63c577f98',
    name: 'טכניקת נשימה 4-7-8',
    duration: 60,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'פשוט לתרגל',
    ],
  },
  {
    id: '649543530e66f2955d2ecbe6',
    name: 'קבלה וחמלה עצמית',
    duration: 420,
    personalized: ['לפתח חמלה עצמית'],
  },
  {
    id: '649546820e66f2955d2ecbea',
    name: 'מדיטציה לסטרס',
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
    name: 'הכרת תודה',
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
    id: '647d94bba09dc890566da740',
    name: 'תרגול לסוף היום',
    duration: 500,
    personalized: ['למצוא שלווה פנימית', 'לשחרר לחצים'],
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
    id: '63c7ca0d6ea337b4c492bce9',
    name: 'תדרים להרגעה',
    duration: 321,
    personalized: ['הפחתת חרדה', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '65a776325c87cdc3c8a4376a',
    name: 'גלי דלטא לשינה',
    duration: 3720,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '65a4ca17d87fd8af807952c3',
    name: 'תדרים לזמן עבודה',
    duration: 3520,
    personalized: ['לתפוס פוקוס', 'תחילת יום'],
  },
  {
    id: '65a38787d87fd8af807952c0',
    name: 'תדרי אלפא להפחתת חרדה',
    duration: 3520,
    personalized: ['הפחתת חרדה'],
  },
  {
    id: '65a385b3d87fd8af807952be',
    name: 'תדרי דלטא להרדמה',
    duration: 3720,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '65a384f7d87fd8af807952b8',
    name: 'קערות טיבטיות להרגעה',
    duration: 1800,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '65a776325c87cdc3c8a4376a',
    name: 'תדרי תטא להרגעה',
    duration: 3720,
    personalized: ['תחילת יום'],
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
    id: '65adff485c87cdc3c8a43775',
    name: 'תדר 432 להרגעה',
    duration: 3660,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'עזרה בלהירדם',
    ],
  },
  {
    id: '65af3a337f0f65fedae69986',
    name: 'תדרים לבעיות קשב',
    duration: 3600,
    personalized: ['לתפוס פוקוס'],
  },
  {
    id: '65b73f3fc5f8700db6cb766c',
    name: 'תדרים לעצבים',
    duration: 1800,
    personalized: ['הפחתת עצבים'],
  },
  {
    id: '65b7400dc5f8700db6cb766f',
    name: 'תדרים לחרדה ופאניקה',
    duration: 4320,
    personalized: ['הפחתת חרדה', 'להוריד פאניקה'],
  },
  {
    id: '65bc67be504e8c7f799422be',
    name: 'תדרים לכאב פיזי',
    duration: 4260,
    personalized: ['וויסות רגשות', 'לשחרר לחצים', 'עזרה בלהירדם'],
  },
  {
    id: '65bee0d1504e8c7f799422c8',
    name: 'תדר 417 לאנרגיה שלילית',
    duration: 4250,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'למצוא שלווה פנימית',
    ],
  },
  {
    id: '65bee001504e8c7f799422c5',
    name: 'קערות טיבטיות לשחרור עצבים',
    duration: 810,
    personalized: ['הפחתת עצבים'],
  },
  {
    id: '65c19273504e8c7f799422cb',
    name: 'תדרים+אוקיינוס להרגעה',
    duration: 1800,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
    ],
  },
  {
    id: '65cb1304c52be40198c8c666',
    name: 'מיינדפולנס תחושות גוף',
    duration: 1080,
    personalized: ['וויסות רגשות', 'לשחרר לחצים', 'עזרה בלהירדם'],
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
    personalized: [
      'למצוא שלווה פנימית',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '65e9b34dcb028746f531ed62',
    name: 'תדרים+יער להרגעה',
    duration: 3600,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
    ],
  },
  {
    id: '6601117a59c283eaab529260',
    name: 'מדיטציה לנקות את הראש',
    duration: 678,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '65f9481f7ea8cddf5c8f7b62',
    name: 'מדיטציה עם תדר אלפא+גשם להרפייה',
    duration: 3600,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'עזרה בלהירדם',
    ],
  },
  {
    id: '65f3ebe7a38d61fdcd76c2c2',
    name: 'מדיטציה בסיסית',
    duration: 540,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '6608f632e1b47cb56ae80f0c',
    name: 'מסע לאיזון הצ׳אקרות',
    duration: 1200,
    personalized: [
      'למצוא שלווה פנימית',
      'לפתח חמלה עצמית',
      'לשחרר לחצים',
      'פשוט לתרגל',
    ],
  },
  {
    id: '6610c3996689fa147ea46c87',
    name: 'תדר 528 להפחתת סטרס וחרדה',
    duration: 1800,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'עזרה בלהירדם',
    ],
  },
  {
    id: '6612076c6689fa147ea46c8e',
    name: 'מעבר על היום - סאמיקשה',
    duration: 800,
    personalized: ['למצוא שלווה פנימית', 'לפתח חמלה עצמית'],
  },
  {
    id: '65dc263a150fa63e232be0e2',
    name: 'שליטה בתשומת הלב',
    duration: 420,
    personalized: [
      'למצוא שלווה פנימית',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '65e9b34dcb028746f531ed62',
    name: 'תדרים+יער להרגעה',
    duration: 3600,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
    ],
  },
  {
    id: '6601117a59c283eaab529260',
    name: 'מדיטציה לנקות את הראש',
    duration: 678,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '65f9481f7ea8cddf5c8f7b62',
    name: 'מדיטציה עם תדר אלפא+גשם להרפייה',
    duration: 3600,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'עזרה בלהירדם',
    ],
  },
  {
    id: '65f3ebe7a38d61fdcd76c2c2',
    name: 'מדיטציה בסיסית',
    duration: 540,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '6608f632e1b47cb56ae80f0c',
    name: 'מסע לאיזון הצ׳אקרות',
    duration: 1200,
    personalized: [
      'למצוא שלווה פנימית',
      'לפתח חמלה עצמית',
      'לשחרר לחצים',
      'פשוט לתרגל',
    ],
  },
  {
    id: '6610c3996689fa147ea46c87',
    name: 'תדר 528 להפחתת סטרס וחרדה',
    duration: 1800,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'עזרה בלהירדם',
    ],
  },
  {
    id: '6612076c6689fa147ea46c8e',
    name: 'מעבר על היום - סאמיקשה',
    duration: 800,
    personalized: ['למצוא שלווה פנימית', 'לפתח חמלה עצמית'],
  },
  {
    id: '66207701eb0f304c83015637',
    name: 'גלי דלתא להירדמות מהירה',
    duration: 3600,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '6628a5a8d237828a515fe50e',
    name: 'מוזיקה בילטרלית ל-PTSD וחרדה',
    duration: 3639,
    personalized: ['הפחתת חרדה', 'להוריד פאניקה', 'לשחרר לחצים'],
  },
  {
    id: '66484d442f4f6e9a4f2bfe18',
    name: 'מדיטציה עם תדרי דלתא להרדמה',
    duration: 1800,
    personalized: ['עזרה בלהירדם'],
  },
  {
    id: '66528b87288c159cfd9cb36f',
    name: 'נוכחות מתמשכת בגוף',
    duration: 1620,
    personalized: [
      'הפחתת עצבים',
      'וויסות רגשות',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'פשוט לתרגל',
    ],
  },
  {
    id: '665bddfa288c159cfd9cb379',
    name: 'מדיטציה לתחושת יציבות',
    duration: 1080,
    personalized: ['לשחרר לחצים', 'פשוט לתרגל'],
  },
  {
    id: null,
    name: 'מדיטציית התבוננות בנשימה',
    duration: 560,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '666e5da1270e17762439443c',
    name: 'מעבר מנוקשות לרכות',
    duration: 960,
    personalized: ['הפחתת עצבים', 'למצוא שלווה פנימית', 'לשחרר לחצים'],
  },
  {
    id: '6677a60a270e177624394441',
    name: 'חיבור לגוף והרפיה עמוקה',
    duration: 1860,
    personalized: [
      'הפחתת חרדה',
      'הפחתת עצבים',
      'וויסות רגשות',
      'להוריד פאניקה',
      'למצוא שלווה פנימית',
      'עזרה בלהירדם',
      'פשוט לתרגל',
    ],
  },
  {
    id: '66811976f237a22a93e4bbc4',
    name: 'מדיטציית הליכה',
    duration: 820,
    personalized: [
      'הפחתת עצבים',
      'לשחרר לחצים',
      'לתפוס פוקוס',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '668a1232f237a22a93e4bbc7',
    name: 'מהו השיח הפנימי שלנו',
    duration: 630,
    personalized: [
      'הכרת תודה',
      'להוריד פאניקה',
      'לשחרר לחצים',
      'פשוט לתרגל',
      'תחילת יום',
    ],
  },
  {
    id: '669348be6b9e727c88ee32cc',
    name: 'מוזיקה וגלי דלתא לשינה עמוקה',
    duration: 3744,
    personalized: ['לשחרר לחצים', 'עזרה בלהירדם'],
  },
  {
    id: '66a5927f639dd37051270982',
    name: 'מדיטציית חיבור לאינטואיציה',
    duration: 880,
    personalized: ['וויסות רגשות', 'למצוא שלווה פנימית', 'פשוט לתרגל'],
  },
];

function getRangeInSeconds(index: number) {
  if (index < 0 || index >= TIME_SLOTS.length) {
    console.error('Index out of bounds');
    return null;
  }

  const start = index === 0 ? 0 : TIME_SLOTS[index - 1] * 60;
  const end = TIME_SLOTS[index] * 60;

  return [start, end];
}

export const usePersonalized = () => {
  const { user } = useUser();
  const { sessions } = useSessions();

  const isExist = (id: string) => sessions.some(s => s.id === id);

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
      return user.sex === 'M' ? 'סיים את היום בטוב' : 'סיימי את היום בטוב';
    } else {
      return user.sex === 'M'
        ? 'הירגע לקראת שינה עמוקה ושלווה'
        : 'הירגעי לקראת שינה עמוקה ושלווה';
    }
  };

  const getOrderedStatesByTime = () => {
    const periodTime = getPeriodOfDay();

    const priorityMappings = {
      morning: ['dayStart', 'focus', 'gratitude'],
      noon: ['stressRelease', 'focus', 'anxietyReduction'],
      afternoon: ['stressRelease', 'focus', 'anxietyReduction'],
      evening: ['stressRelease', 'focus', 'anxietyReduction'],
      night: ['sleepAid', 'stressRelease', 'panicReduction'],
    };

    const priorityKeys = priorityMappings[periodTime] || [];

    const orderedAndRandomStates = PERSONALIZED_STATES.sort((a, b) => {
      const aPriority = priorityKeys.indexOf(a.key);
      const bPriority = priorityKeys.indexOf(b.key);

      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;

      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;

      return 0;
    });

    const firstNonPriorityIndex = orderedAndRandomStates.findIndex(
      state => priorityKeys.indexOf(state.key) === -1,
    );

    const shuffledPart = shuffleArray(
      orderedAndRandomStates.slice(firstNonPriorityIndex),
    );

    return orderedAndRandomStates
      .slice(0, firstNonPriorityIndex)
      .concat(shuffledPart);
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

    const filteredSessions = MAPPING.filter(
      s =>
        s.personalized.includes(personalized) &&
        s.duration > start &&
        s.duration <= end,
    );

    return filteredSessions.map(({ id }) => id).filter(isExist);
  };

  return {
    getSessionIdsByStateAndTime,
    pickSession,
    getTitle,
    getSubtitle,
    getOrderedStatesByTime,
  };
};
