import { DocumentChatCategory } from '@screens/Main/Tabs/Courses/DocumentChatCategoryList';
import {
  ChatCategories,
  ChatCategoriesEnum,
} from '@store/useCategorizedChatFlowStore';
import { Category } from 'types/Category';

export * from './amplitude-events';

export * from './messages';

export const SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED';
export const SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON';
export const SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF';

export const BG_TRACKS = [
  {
    id: 'frequency',
    name: 'Фолк',
    asset: 'frequencies.mp3',
    emoji: '🎧',
  },
  {
    id: 'ocean',
    name: 'Океан',
    asset: 'ocean.mp3',
    emoji: '🌊',
  },
  { id: 'birds', name: 'Птахи', asset: 'birds.mp3', emoji: '🐦' },
  { id: 'waves', name: 'Хвилі', asset: 'waves.mp3', emoji: '💦' },
  { id: 'bowls', name: 'Дзвін', asset: 'bowls.mp3', emoji: '🥣' },
  { id: 'rain', name: 'Дощ', asset: 'rain.mp3', emoji: '🌧' },
] as const;

export type BgTrackID = (typeof BG_TRACKS)[number]['id'] | 'off';

export const CATEGORY_COLOR = {
  Short: '#000',
  South: '#A0625E',
  Emergency: '#273E40',
  Stress: '#0B275F',
  Work: '#1E0078',
  Empower: '#FC713B',
  DeepDives: '#000',
  OnTheRoad: '#7C7138',
  PocketMeditation: '#474418',
  Advance: '#125946',
  Sleep: '#6C665E',
  Army: '#3F3C2E',
  Visual: '#0F42E0',
} as const;

export const LIMIT_MAX_MEDITATIONS_FEED = 3;

export const COUNTRY_CODE = 'IL';

export const KEY_PLAYED_FIRST = 'firstPlay';


export const TIME_SLOTS = [1, 10, 20, 60];

export const SOUNDS_URL =
  'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/music/';

export const FREE_CHAT_TITLE = 'Звичайний чат';
export const SELF_DEV_TITLE = 'Саморозвиток';
export const NEGATIVE_THOUGHTS_TITLE = 'Керування негативними емоціями';
export const ANXIETY_TITLE = 'Тривога: розуміння та подолання';
export const BAD_HABITS_TITLE = 'Звільнення від шкідливих звичок';

export type ChatTypeData = {
  id: number;
  type: ChatCategories;
  title: string;
  description: string;
  sessionCount: number;
  bgColor: string;
};

export const CHAT_TYPES: ChatTypeData[] = [
  {
    id: 1,
    type: null,
    title: FREE_CHAT_TITLE,
    description:
      'Поділитися, порадитися або просто висловитися... це місце, де можна поговорити з Майклом на будь-яку тему. Тут ви також знайдете всі ваші попередні розмови.',
    sessionCount: 0,
    bgColor: '#1476773D',
  },
  {
    id: 2,
    type: ChatCategoriesEnum.SELF_DEV,
    title: SELF_DEV_TITLE,
    description:
      'Відчуваєте, що застрягли та не можете рухатися вперед? На наших спільних зустрічах ми можемо рости та досягати цілей, про які ви завжди мріяли.',
    sessionCount: 0,
    bgColor: '#FFE3C5',
  },
  {
    id: 3,
    type: ChatCategoriesEnum.NEGATIVE,
    title: NEGATIVE_THOUGHTS_TITLE,
    description:
      'Давайте разом визначимо ваші негативні моделі мислення та керувати ними, зрозуміємо їхній вплив на почуття та поведінку та навчимося перетворювати їх на здорові та сприятливі думки.',
    sessionCount: 0,
    bgColor: '#D4E4FE',
  },
  {
    id: 4,
    type: ChatCategoriesEnum.ANXIETY,
    title: ANXIETY_TITLE,
    description:
      'Відкрийте причини своєї тривоги та вивчіться бороти її. Разом ми працюватимемо над глибшим розумінням і досягненням вашого душевного спокою.',
    sessionCount: 0,
    bgColor: '#F9D8D7',
  },
  {
    id: 5,
    type: ChatCategoriesEnum.BAD_HABITS,
    title: BAD_HABITS_TITLE,
    description:
      'Позбавлення від шкідливих звичок потребує часу, але це можливо. Якщо вам потрібна підтримка, щоб позбутися їх, я тут, щоб супроводжувати вас у цьому процесі та допомогти вам зробити крок до позитивних змін.',
    sessionCount: 0,
    bgColor: '#E8E6F3',
  },
];

export const REGA_INSTRUCTOR_ID = '648af8fb0e66f2955d2ecbc8';

export const CATEGORY_NAMES: Record<ChatCategoriesEnum | '', string> = {
  [ChatCategoriesEnum.BAD_HABITS]: 'Погані звички',
  [ChatCategoriesEnum.ANXIETY]: 'Тривога',
  [ChatCategoriesEnum.NEGATIVE]: 'Негативні думки',
  [ChatCategoriesEnum.SELF_DEV]: 'Саморозвиток',
  '': '',
};

export const PICK_MEDITATION_CATEGORY_IDS = {
  stress: '5eca521e10fe0480d350c9b1',
  empover: '648ae4240e66f2955d2ecbc5',
  emergency: '5eca521e10fe0480d350c9b4',
  pocket_meditation: '602a6ef5410b770dd49e0d14',
  focus: '5eca521e10fe0480d350c9b5',
  breathe: '6476e7e7289563e63c577f94',
  sleep: '5eca521e10fe0480d350c9b0',
};

export type ExploreElement = {
  imageName: any;
  title: string;
  design: {
    height: number;
    width: number;
  };
  screenNavigation?: string;
};

export const DOCUMENT_CHAT_CATEGORIES: DocumentChatCategory[] = [
  {
    name: 'law',
    subTitle: 'Юридична допомога без зайвих клопотів',
    title: 'Юриспруденція',
    info: 'Юридичний помічник з можливістю опрацювання правових документів. Завантажте договори, законодавчі акти або юридичні висновки, і отримайте їх професійний аналіз та відповіді на ваші правові запитання з урахуванням українського законодавства. Асистент допоможе зрозуміти складні юридичні терміни, процедури та нормативні положення, наводячи точні посилання на закони, але завжди рекомендуватиме звернутися до кваліфікованого юриста для вирішення специфічних правових питань.',
    image:
      'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/law-3.jpg',
  },
  {
    name: 'medicine',
    subTitle: "Експертні знання для вашого здоров'я на відстані одного кліка",
    title: 'Медицина',
    info: 'Спеціалізований асистент для медичної консультації з можливістю аналізу професійних документів. Завантажте медичні дослідження, протоколи лікування або наукові статті, і отримайте їх детальний аналіз та відповіді на ваші запитання. Асистент розшифрує складні медичні терміни та методики, але завжди нагадає про необхідність консультації лікаря.',
    image:
      'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/medicine_3.jpeg',
  },
  {
    name: 'engineering',
    subTitle: 'Перетворюємо складні технічні завдання на прості рішення',
    title: 'Інженерія',
    info: 'Технічний консультант зі здатністю аналізувати інженерні документи. Завантажте технічні специфікації, креслення, проектну документацію або інструкції, і отримайте їх докладний розбір та відповіді на ваші технічні запитання. Асистент допоможе розібратися в складних технічних рішеннях, формулах, методологіях та стандартах, використовуючи точну термінологію та одиниці вимірювання. Ідеальний помічник для інженерів, проектувальників та технічних спеціалістів.',
    image:
      'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/engine-best.jpg',
  },
];

export const DOCUMENT_CHAT_CATEGORY_TITLES = {
  law: 'Юриспруденція',
  medicine: 'Медицина',
  engineering: 'Інженерія',
  default: 'Інше',
};

export const DOCUMENT_CHAT_CATEGORY_IMAGES = {
  law: 'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/law-3.jpg',
  medicine:
    'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/medicine_3.jpeg',
  engineering:
    'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/engine-best.jpg',
};

export type CategoriesObject = {
  [key: string]: Category;
};

export type MeditationCategoryKey = keyof typeof PICK_MEDITATION_CATEGORY_IDS;

export const EMAIL_CHECK_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
