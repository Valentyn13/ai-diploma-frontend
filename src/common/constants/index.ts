import {
  Energy,
  Focus,
  Panic,
  Relax,
  Sleep,
  Stress,
} from '@common/assets/illustrations';
import {
  ChatCategories,
  ChatCategoriesEnum,
} from '@store/useCategorizedChatFlowStore';

// CHAT CATEGORIES CONSTANTS
import { PersonalizedState } from '../../../types/Personalized';

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
    name: 'תדרים',
    asset: 'frequencies.mp3',
    emoji: '🎧',
  },
  {
    id: 'ocean',
    name: 'אוקיינוס',
    asset: 'ocean.mp3',
    emoji: '🌊',
  },
  { id: 'birds', name: 'ציפורים', asset: 'birds.mp3', emoji: '🐦' },
  { id: 'waves', name: 'גלים', asset: 'waves.mp3', emoji: '🌊' },
  { id: 'bowls', name: 'קערות', asset: 'bowls.mp3', emoji: '🥣' },
  { id: 'rain', name: 'גשם', asset: 'rain.mp3', emoji: '🌧' },
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

export const MEDITATIONS_FEELING_LOCATION = [
  {
    feeling: ['anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['bed'],
    id: '5eca520c10fe0480d350c98e',
  },
  {
    feeling: ['unfocused'],
    location: ['home', 'study', 'work', 'army'],
    id: '63c4fe3ec1ab3549d358c3cf',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '63c0efce2c4099bc0e36e44f',
  },
  {
    feeling: ['unfocused', 'calm'],
    location: ['home', 'work'],
    id: '64bf65afe361a71983a5f3ad',
  },
  {
    feeling: ['unfocused', 'anxious', 'stressed'],
    location: ['home', 'work'],
    id: '64daea785d57908b4359d27a',
  },
  {
    feeling: ['unfocused', 'stressed', 'calm'],
    location: ['bed'],
    id: '63c0edd62c4099bc0e36e441',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '643c1650bb731339805e903f',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '65093d7d1d1970cfe5ebe388',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '64d2f01242357e4b9d18fe36',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '654c74b8ba86f01d58165692',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'work'],
    id: '6437c1ddc90514876f526229',
  },
  {
    feeling: ['angry'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '650bf86a1d1970cfe5ebe38d',
  },
  {
    feeling: ['anxious', 'angry', 'calm'],
    location: ['bed'],
    id: '63c22ac74e4c5b11918e6091',
  },
  {
    feeling: ['stressed'],
    location: ['bed'],
    id: '654c755bba86f01d58165694',
  },
  {
    feeling: ['unfocused', 'calm'],
    location: ['home', 'study', 'work'],
    id: '6537b2be092f89755aeb9016',
  },
  {
    feeling: ['anxious', 'angry', 'stressed'],
    location: ['home', 'work'],
    id: '638edb9e132405bcd302f6c1',
  },
  {
    feeling: ['calm'],
    location: ['home', 'work'],
    id: '643fa94789ea3102dfe03b2e',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'work'],
    id: '6471b01a538c7fe78164398a',
  },
  {
    feeling: ['stressed'],
    location: ['home', 'study', 'work', 'army'],
    id: '6437c209c90514876f52622a',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['way'],
    id: '6537b3d1092f89755aeb901a',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['home', 'study', 'work'],
    id: '650bfc401d1970cfe5ebe393',
  },
  {
    feeling: ['anxious', 'angry', 'sad'],
    location: ['home', 'study', 'work', 'army'],
    id: '64f57470d1342603f4d29cf9',
  },
  {
    feeling: ['angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '64fd6d0fc1bd701354997f99',
  },
  {
    feeling: ['anxious', 'angry', 'sad'],
    location: ['home', 'study', 'work', 'army'],
    id: '657147d0042258f6bc2d20a9',
  },
  {
    feeling: ['calm'],
    location: ['bed'],
    id: '648b02160e66f2955d2ecbcc',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed'],
    location: ['home', 'study', 'work'],
    id: '63c0ef0b2c4099bc0e36e448',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c994',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry'],
    location: ['home', 'bed'],
    id: '644fc3948b29c767b4e6b66f',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'calm'],
    location: ['way'],
    id: '655707abef4c61fb4c3d8091',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry'],
    location: ['home'],
    id: '644fc4398b29c767b4e6b671',
  },
  {
    feeling: ['unfocused'],
    location: ['home'],
    id: '6565b79e253db951b9a34f44',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['way'],
    id: '6578019e8498ee36f5128ad6',
  },
  {
    feeling: ['anxious', 'stressed', 'sad'],
    location: ['bed'],
    id: '649545120e66f2955d2ecbe9',
  },
  {
    feeling: ['stressed'],
    location: ['bed'],
    id: '5eca520c10fe0480d350c98d',
  },
  {
    feeling: ['stressed'],
    location: ['bed'],
    id: '5eca520c10fe0480d350c990',
  },
  {
    feeling: ['angry', 'sad'],
    location: ['home', 'study', 'work', 'army'],
    id: '6444f9d689ea3102dfe03b3d',
  },
  {
    feeling: ['stressed', 'sad'],
    location: ['home'],
    id: '63a90bfe49d0f8f7db26dc21',
  },
  {
    feeling: ['anxious'],
    location: ['army'],
    id: '5eca520c10fe0480d350c998',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '64046109420a84635493a7fe',
  },
  {
    feeling: ['unfocused'],
    location: ['study'],
    id: '5eca520c10fe0480d350c9a4',
  },
  {
    feeling: ['angry', 'sad'],
    location: ['home'],
    id: '63aa61c65fbca84d76752332',
  },
  {
    feeling: ['unfocused', 'anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '6476e8a8289563e63c577f96',
  },
  {
    feeling: ['anxious'],
    location: ['home'],
    id: '5eca520c10fe0480d350c993',
  },
  {
    feeling: ['anxious', 'angry', 'stressed', 'sad'],
    location: ['home'],
    id: '6495427e0e66f2955d2ecbe4',
  },
  {
    feeling: ['stressed'],
    location: ['study'],
    id: '5eca520c10fe0480d350c9ac',
  },
  {
    feeling: ['unfocused'],
    location: ['home', 'way', 'study', 'work', 'army'],
    id: '63c22de34e4c5b11918e609a',
  },
  {
    feeling: ['unfocused', 'calm'],
    location: ['home', 'work'],
    id: '630b5093f77053953f6e6595',
  },
  {
    feeling: ['sad'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '5eca520c10fe0480d350c992',
  },
  {
    feeling: ['unfocused'],
    location: ['home', 'way', 'study', 'work', 'army'],
    id: '648b00f40e66f2955d2ecbca',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'calm'],
    location: ['way'],
    id: '647d9465a09dc890566da73e',
  },
  {
    feeling: ['anxious'],
    location: ['study'],
    id: '649544730e66f2955d2ecbe8',
  },
  {
    feeling: ['unfocused', 'angry', 'sad'],
    location: ['home', 'work'],
    id: '6482034d0e66f2955d2ecbb9',
  },
  {
    feeling: ['anxious', 'sad'],
    location: ['home', 'study', 'work', 'army'],
    id: '648c0c220e66f2955d2ecbd1',
  },
  {
    feeling: ['stressed'],
    location: ['home'],
    id: '647d94bba09dc890566da740',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c9a2',
  },
  {
    feeling: ['unfocused', 'angry'],
    location: ['way'],
    id: '5eca520c10fe0480d350c9a0',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['way'],
    id: '5eca520c10fe0480d350c99d',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry'],
    location: ['way'],
    id: '5eca520c10fe0480d350c99c',
  },
  {
    feeling: ['unfocused'],
    location: ['home'],
    id: '6486c3290e66f2955d2ecbc1',
  },
  {
    feeling: ['unfocused', 'angry', 'stressed'],
    location: ['way'],
    id: '5eca520c10fe0480d350c99e',
  },
  {
    feeling: ['sad'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '6466156b8fd24279bde32ed1',
  },
  {
    feeling: ['anxious'],
    location: ['study'],
    id: '5eca520c10fe0480d350c9a9',
  },
  {
    feeling: ['anxious'],
    location: ['study'],
    id: '5eca520c10fe0480d350c995',
  },
  {
    feeling: ['angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c9a1',
  },
  {
    feeling: ['sad'],
    location: ['home', 'work', 'army'],
    id: '6466169a8fd24279bde32ed2',
  },
  {
    feeling: ['stressed'],
    location: ['work'],
    id: '61a8becdc9ff5226651bfcc5',
  },
  {
    feeling: ['unfocused'],
    location: ['study', 'work'],
    id: '5eca520c10fe0480d350c9ab',
  },
  {
    feeling: ['anxious'],
    location: ['study'],
    id: '5eca520c10fe0480d350c9ae',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'calm'],
    location: ['home', 'bed'],
    id: '639b110473b17c70f878a685',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '5ef2ff15f1a23752be006520',
  },
  {
    feeling: ['unfocused'],
    location: ['home'],
    id: '639b12c773b17c70f878a68a',
  },
  {
    feeling: ['unfocused'],
    location: ['home', 'way', 'study', 'work', 'army'],
    id: '639b135b73b17c70f878a68b',
  },
  {
    feeling: ['angry'],
    location: ['home', 'way', 'study', 'bed', 'work'],
    id: '63c7ca0d6ea337b4c492bce9',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['bed'],
    id: '65a776325c87cdc3c8a4376a',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['work'],
    id: '65a4ca17d87fd8af807952c3',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'way', 'study', 'bed', 'work', 'army'],
    id: '65a38787d87fd8af807952c0',
  },
  {
    feeling: ['unfocused', 'anxious', 'angry', 'stressed', 'sad', 'calm'],
    location: ['bed'],
    id: '65a385b3d87fd8af807952be',
  },
] as const;

export const COLLECTIONS_TIME_OF_DAY = [
  {
    id: 'morning',
    title: 'להתחיל את היום',
    trackIds: [
      '64bf65afe361a71983a5f3ad',
      '6556ed29ef4c61fb4c3d8090',
      '63c0efce2c4099bc0e36e44f',
      '63c0f06f2c4099bc0e36e458',
      '658fb367fb0b91e8e6464665',
      '6581265e887bd0b4c6e5f7a8',
      '63c0ef0b2c4099bc0e36e448',
      '6578019e8498ee36f5128ad6',
      '5eca520c10fe0480d350c9aa',
      '6601117a59c283eaab529260',
      '6537b2be092f89755aeb9016',
      '65a776325c87cdc3c8a4376a',
      '6437c209c90514876f52622a',
      '65f3ebe7a38d61fdcd76c2c2',
      '6578019e8498ee36f5128ad6',
    ],
  },
  {
    id: 'noon',
    title: 'הפוגה באמצע היום',
    trackIds: [
      '61a8becdc9ff5226651bfcc5',
      '64046020420a84635493a7f5',
      '6601117a59c283eaab529260',
      '665bddfa288c159cfd9cb379',
      '6601117a59c283eaab529260',
      '5eca520c10fe0480d350c9a0',
      '5eca520c10fe0480d350c99d',
      '664028f72f4f6e9a4f2bfe13',
      '65a385b3d87fd8af807952be',
      '65d5d5037f6b2aedaeb4ffb4',
      '6437c209c90514876f52622a',
      '6437c1ddc90514876f526229',
    ],
  },
  {
    id: 'afternoon',
    title: 'לאחר שיא היום',
    trackIds: [
      '66af33072baf0ad46fcd9eb6',
      '666e5da1270e17762439443c',
      '66a5927f639dd37051270982',
      '5eca520c10fe0480d350c99c',
      '65a385b3d87fd8af807952be',
      '65f9481f7ea8cddf5c8f7b62',
      '64f57470d1342603f4d29cf9',
      '65c19273504e8c7f799422cb',
      '65bee0d1504e8c7f799422c8',
      '6471b01a538c7fe78164398a',
      '63aa61c65fbca84d76752332',
      '644fc3948b29c767b4e6b66f',
    ],
  },
  {
    id: 'evening',
    title: 'סוגרים יום ברוגע',
    trackIds: [
      '6677a60a270e177624394441',
      '66b850e0c63895e2037ff83c',
      '6612076c6689fa147ea46c8e',
      '657147d0042258f6bc2d20a9',
      '66371d6a2f4f6e9a4f2bfe08',
      '647d94bba09dc890566da740',
      '65b73f3fc5f8700db6cb766c',
      '6612076c6689fa147ea46c8e',
      '65bee0d1504e8c7f799422c8',
      '659a1371c5b8e4f335e3ef8f',
      '649543530e66f2955d2ecbe6',
      '649546820e66f2955d2ecbea',
      '6471b01a538c7fe78164398a',
      '64046020420a84635493a7f5',
    ],
  },
  {
    id: 'night',
    title: 'חלומות נעימים',
    trackIds: [
      '654c755bba86f01d58165694',
      '63c0edd62c4099bc0e36e441',
      '649545120e66f2955d2ecbe9',
      '5eca520c10fe0480d350c98e',
      '66371d6a2f4f6e9a4f2bfe08',
      '5eca520c10fe0480d350c98f',
      '661b8ce87bcdb866cd1a4a33',
      '5eca520c10fe0480d350c990',
      '65a776325c87cdc3c8a4376a',
      '66207701eb0f304c83015637',
    ],
  },
];

export const ABSTRACT_VIDEOS: Record<string, string> = {
  sleep: 'sleep.mp4',
  stress: 'stress.mp4',
  army: 'army.mp4',
  ontheroad: 'way.mp4',
  pocketmeditation: 'pocketmeditation.mp4',
  starthere: 'starter.mp4',
  emergency: 'emergency.mp4',
  work: 'work.mp4',
  advance: 'advance.mp4',
  empower: 'empower.mp4',
  south: 'beterSelf.mp4',
};

export const VIDEOS: Record<string, string> = {
  ...ABSTRACT_VIDEOS,
  breath478: 'breathe-4-7-8.mp4',
  breathbox: 'breathe-box.mp4',
  circlebreating: 'circle-breathing.mp4',
  noseBreath: 'nose-breath.mp4',
  ['2-8breath.mp4']: '2-8breath.mp4',
  ['4-4-4triangle.mp4']: '4-4-4triangle.mp4',
  ['4-4-4box.mp4']: '4-4-4box.mp4',
  ['4-7-8new.mp4']: '4-7-8new.mp4',
  ['4-4equal.mp4']: '4-4equal.mp4',
};

export const LIMIT_MAX_MEDITATIONS_FEED = 3;

export const COLLECTIONS = [
  {
    id: 'body-mind',
    title: 'אזנו בין גוף לנפש',
    trackIds: [
      '5eca520c10fe0480d350c999',
      '5eca520c10fe0480d350c9ac',
      '602a6663410b770dd49e0d10',
      '64954c1c0e66f2955d2ecbed',
      '649543530e66f2955d2ecbe6',
      '644fc4398b29c767b4e6b671',
      '644fc3948b29c767b4e6b66f',
      '6537b3d1092f89755aeb901a',
      '648c0c220e66f2955d2ecbd1',
      '62bd6c670888f539f97d85d0',
    ],
  },
  {
    id: 'quiet-soul',
    title: 'שקט לנשמה',
    trackIds: [
      '64954ae20e66f2955d2ecbec',
      '6601117a59c283eaab529260',
      '66371d6a2f4f6e9a4f2bfe08',
      '65e9b34dcb028746f531ed62',
      '65c19273504e8c7f799422cb',
      '63c0efce2c4099bc0e36e44f',
      '65a385b3d87fd8af807952be',
      '65d5d5037f6b2aedaeb4ffb4',
      '657147d0042258f6bc2d20a9',
      '644fc4398b29c767b4e6b671',
      '65adff485c87cdc3c8a43775',
      '65b73f3fc5f8700db6cb766c',
      '638edb9e132405bcd302f6c1',
      '6601117a59c283eaab529260',
      '64046020420a84635493a7f5',
      '6495406c0e66f2955d2ecbe1',
    ],
  },
  {
    id: 'self-development',
    title: 'פיתוח עצמי',
    trackIds: [
      '5eca520c10fe0480d350c997',
      '63aa61c65fbca84d76752332',
      '63c22de34e4c5b11918e609a',
      '63c0f1412c4099bc0e36e467',
      '64954c1c0e66f2955d2ecbed',
      '644fc3948b29c767b4e6b66f',
      '5eca520c10fe0480d350c9a8',
    ],
  },
  {
    id: 'basics',
    title: 'יסודות',
    trackIds: [
      '63c4fdf6c1ab3549d358c3ce',
      '6601117a59c283eaab529260',
      '63c4fe3ec1ab3549d358c3cf',
      '63c4fef7c1ab3549d358c3d1',
      '63c4ffbec1ab3549d358c3d2',
      '63c4fff9c1ab3549d358c3d3',
      '65cb1304c52be40198c8c666',
      '662db5e16786876c42a883f1',
    ],
  },
  {
    id: 'self-connection',
    title: 'חיבור לפנימיות',
    trackIds: [
      '6404605b420a84635493a7f6',
      '63aa61c65fbca84d76752332',
      '64b74b85b8394af97a9c0c00',
      '647d9494a09dc890566da73f',
      '6608f632e1b47cb56ae80f0c',
      '6482034d0e66f2955d2ecbb9',
      '6444fa6489ea3102dfe03b3f',
      '63b3fb8ae6e4abaf47376671',
      '649543530e66f2955d2ecbe6',
    ],
  },
  {
    id: 'reduce-stress',
    title: 'הפיגו חרדות ולחצים',
    trackIds: [
      '654c74b8ba86f01d58165692',
      '657147d0042258f6bc2d20a9',
      '6601117a59c283eaab529260',
      '65d5d5037f6b2aedaeb4ffb4',
      '65c19273504e8c7f799422cb',
      '6610c3996689fa147ea46c87',
      '64d2f01242357e4b9d18fe36',
      '6437c1ddc90514876f526229',
      '65adff485c87cdc3c8a43775',
      '6404605b420a84635493a7f6',
      '6471b01a538c7fe78164398a',
      '65b7400dc5f8700db6cb766f',
      '659a1371c5b8e4f335e3ef8f',
      '65f9481f7ea8cddf5c8f7b62',
      '66371d6a2f4f6e9a4f2bfe08',
    ],
  },
  {
    id: 'self-love',
    title: 'אהבה עצמית',
    trackIds: [
      '643fd04089ea3102dfe03b34',
      '649543530e66f2955d2ecbe6',
      '647d9494a09dc890566da73f',
      '648ff7420e66f2955d2ecbd5',
      '5eca520c10fe0480d350c993',
      '64d48aeefaae4c8530cb4c38',
      '64afe19abe04cd664e5f819e',
      '6404605b420a84635493a7f6',
    ],
  },
  {
    id: 'healthy-life',
    title: 'לחיות בריא',
    trackIds: [
      '64954ae20e66f2955d2ecbec',
      '63aa61c65fbca84d76752332',
      '6601117a59c283eaab529260',
      '65b73f3fc5f8700db6cb766c',
      '6537b3d1092f89755aeb901a',
      '64b74b85b8394af97a9c0c00',
      '65a776325c87cdc3c8a4376a',
      '657147d0042258f6bc2d20a9',
      '647d9465a09dc890566da73e',
      '649543530e66f2955d2ecbe6',
      '644fc4038b29c767b4e6b670',
      '63c22de34e4c5b11918e609a',
      '644fc3948b29c767b4e6b66f',
    ],
  },
  {
    id: 'focus-motivation',
    title: 'חדדו ריכוז ומוטיבציה',
    trackIds: [
      '63c22de34e4c5b11918e609a',
      '65af3a337f0f65fedae69986',
      '65a4ca17d87fd8af807952c3',
      '65dc263a150fa63e232be0e2',
      '63c4fff9c1ab3549d358c3d3',
      '644fc4038b29c767b4e6b670',
      '648b00f40e66f2955d2ecbca',
      '63c22de34e4c5b11918e609a',
      '644fc3948b29c767b4e6b66f',
      '647d9465a09dc890566da73e',
      '5eca520c10fe0480d350c9aa',
      '64510b4c8b29c767b4e6b681',
    ],
  },
  {
    id: 'better-sleep',
    title: 'לישון טוב יותר',
    trackIds: [
      '63c0edd62c4099bc0e36e441',
      '66207701eb0f304c83015637',
      '661b8ce87bcdb866cd1a4a33',
      '65f9481f7ea8cddf5c8f7b62',
      '65c19273504e8c7f799422cb',
      '649545120e66f2955d2ecbe9',
      '654c755bba86f01d58165694',
      '5eca520c10fe0480d350c98e',
      '648b02160e66f2955d2ecbcc',
      '63c22ac74e4c5b11918e6091',
      '5eca520c10fe0480d350c990',
    ],
  },
];

export const COUNTRY_CODE = 'IL';

export const KEY_PLAYED_FIRST = 'firstPlay';

export const EXERCISES = [
  {
    name: 'חרדה 😰',
    id: 'anxiety',
    description:
      'טכניקת הנשימה 4-4-4-4 כוללת שאיפה למשך 4 שניות, עצירת נשימה למשך 4 שניות, נשיפה למשך 4 שניות והמתנה למשך 4 שניות לפני החזרה על המחזור. השיטה מרגיעה את המוח ומשרירי הגוף ועוזרת להרפות ולהירגע',
    sequences: [
      { seconds: 4, type: 'שאיפה' },
      { seconds: 4, type: 'החזיקו' },
      { seconds: 4, type: 'נשיפה' },
      { seconds: 4, type: 'החזיקו' },
    ],
    illustration: Sleep,
    colors: ['#B0C4DE', '#4B0082'],
  },
  {
    name: 'סטרס 😖',
    id: 'stress',
    description:
      'טכניקת הנשימה הסרעפתית האיטית והעמוקה כוללת שאיפה איטית דרך האף למשך 5 שניות, עצירת נשימה למשך 2 שניות ונשיפה איטית דרך הפה למשך 6 שניות. הטכניקה מפעילה את תגובת ההרגעה של הגוף ובכך מפחיתה לחץ.',
    sequences: [
      { seconds: 5, type: 'שאיפה' },
      { seconds: 2, type: 'החזיקו' },
      { seconds: 6, type: 'נשיפה' },
    ],
    colors: ['#ADD8E6', '#000080'],
    illustration: Stress,
  },
  {
    name: 'פוקוס 🎯',
    id: 'focus',
    description:
      'טכניקת הנשימה 4-7-8 יעילה לפוקוס וריכוז: שאיפה ל-4 שניות, עצירת נשימה ל-7 שניות, ונשיפה איטית ל-8 שניות. הטכניקה משפרת ריכוז וביצועים במצבי לחץ.',
    sequences: [
      { seconds: 4, type: 'שאיפה' },
      { seconds: 7, type: 'החזיקו' },
      { seconds: 8, type: 'נשיפה' },
    ],
    colors: ['#328d37', '#32a8d2'],
    illustration: Focus,
  },
  {
    name: 'פאניקה 😨',
    id: 'panic',
    description:
      'טכניקת הנשימה 4-8 כוללת שאיפה למשך 4 שניות ונשיפה למשך 8 שניות. תרגיל נשימה זה מאריך את הנשיפה ומסייע בהפחתת חרדה ומתח על ידי הפעלת מערכת העצבים הפאראסימפתטית, המקדמת הרפיה.',
    sequences: [
      { seconds: 4, type: 'שאיפה' },
      { seconds: 8, type: 'נשיפה' },
    ],
    colors: ['#FF4500', '#8B0000'],
    illustration: Panic,
  },
  {
    name: 'אנרגיה ⚡',
    id: 'energy',
    description:
      'טכניקת הנשימה 4-4-4 כוללת שאיפה עמוקה למשך 4 שניות, עצירת נשימה למשך 4 שניות ונשיפה בכוח למשך 4 שניות. תרגיל נשימה זה מסייע בהגברת הערנות ורמות האנרגיה, תוך שיפור זרימת הדם.',
    sequences: [
      { seconds: 4, type: 'שאיפה' },
      { seconds: 4, type: 'החזיקו' },
      { seconds: 4, type: 'נשיפה' },
    ],
    colors: ['#00FF7F', '#32CD32'],
    illustration: Energy,
  },
  {
    name: 'הרגעה 😌',
    id: 'relax',
    description:
      'טכניקת הנשימה 4-4-6 כוללת שאיפה למשך 4 שניות, עצירת נשימה למשך 4 שניות ונשיפה למשך 6 שניות. תרגיל נשימה זה מרגיע את הנפש והגוף ומקדם תחושה כללית של רוגע והרפיה.',
    sequences: [
      { seconds: 4, type: 'שאיפה' },
      { seconds: 4, type: 'החזיקו' },
      { seconds: 6, type: 'נשיפה' },
    ],
    colors: ['#4682B4', '#B0E0E6'],
    illustration: Relax,
  },
];

export type IExercise = (typeof EXERCISES)[number];

export const PERSONALIZED_STATES: PersonalizedState[] = [
  { key: 'sleepAid', label: 'עזרה בלהירדם', emoji: '🌙', color: '#0d47a1' },
  { key: 'stressRelease', label: 'לשחרר לחצים', emoji: '🍃', color: '#00695c' },
  { key: 'focus', label: 'לתפוס פוקוס', emoji: '🎯', color: '#bf360c' },
  {
    key: 'panicReduction',
    label: 'להוריד פאניקה',
    emoji: '🧘‍♂️',
    color: '#004d40',
  },
  {
    key: 'innerPeace',
    label: 'למצוא שלווה פנימית',
    emoji: '☮️',
    color: '#1a237e',
  },
  {
    key: 'selfCompassion',
    label: 'לפתח חמלה עצמית',
    emoji: '❤️',
    color: '#880e4f',
  },
  {
    key: 'emotionRegulation',
    label: 'וויסות רגשות',
    emoji: '🌡️',
    color: '#b71c1c',
  },
  {
    key: 'sadnessReduction',
    label: 'הפחתת עצבים',
    emoji: '😌',
    color: '#263238',
  },
  { key: 'gratitude', label: 'הכרת תודה', emoji: '🙏', color: '#3e2723' },
  { key: 'dayStart', label: 'תחילת יום', emoji: '🌅', color: '#1b5e20' },
  {
    key: 'anxietyReduction',
    label: 'הפחתת חרדה',
    emoji: '🍵',
    color: '#004d40',
  },
  { key: 'justPractice', label: 'פשוט לתרגל', emoji: '🔄', color: '#37474f' },
] as const;

export const TIME_SLOTS = [1, 10, 20, 60];

// URL CONSTANTS FROM ALL APP
export const BGS_ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/bgs/';
export const MEDITATIONS_IMAGES_URL =
  'https://d137rfe7jg135q.cloudfront.net/sessions/meditations/';
export const SOUNDS_URL = 'https://d137rfe7jg135q.cloudfront.net/sounds/';
export const ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/';
export const VIDEO_URL = `${ASSETS_URL}videos/`;
export const OLD_ASSETS_URL =
  'https://regameditation.s3.us-east-2.amazonaws.com/';

export const PLAY_STORE_FALLBACK_URL =
  'https://play.google.com/store/apps/details?id=com.rega.regaapp';

export const APP_STORE_FALLBACK_URL =
  'https://apps.apple.com/ua/app/rega-%D7%A8%D7%92%D7%A2/id1549517842';

export const FREE_CHAT_TITLE = 'צ׳אט חופשי';
export const SELF_DEV_TITLE = 'פיתוח עצמי';
export const NEGATIVE_THOUGHTS_TITLE = 'ניהול דפוסי חשיבה שליליים';
export const ANXIETY_TITLE = 'חרדה: הבנה והתמודדות';
export const BAD_HABITS_TITLE = 'שחרור מהרגלים רעים';

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
      'לשתף, להתייעץ או סתם לפרוק... זה המקום לדבר עם מיכאל על כל נושא שתרצו. כאן גם תמצאו את כל השיחות הקודמות שלכם.',
    sessionCount: 0,
    bgColor: '#1476773D',
  },
  {
    id: 2,
    type: ChatCategoriesEnum.SELF_DEV,
    title: SELF_DEV_TITLE,
    description:
      'מרגישים תקועים ולא מצליחים להתקדם? במפגשים שלנו יחד נוכל לצמוח ולהגשים את המטרות שתמיד חלמתם להגשים.',
    sessionCount: 0,
    bgColor: '#FFE3C5',
  },
  {
    id: 3,
    type: ChatCategoriesEnum.NEGATIVE,
    title: NEGATIVE_THOUGHTS_TITLE,
    description:
      'בוא נזהה וננהל יחד את דפוסי החשיבה השליליים שלך, נבין את השפעתם על התחושות וההתנהגות, ונלמד כיצד להפוך אותם לדפוסים בריאים ומקדמים.',
    sessionCount: 0,
    bgColor: '#D4E4FE',
  },
  {
    id: 4,
    type: ChatCategoriesEnum.ANXIETY,
    title: ANXIETY_TITLE,
    description:
      'גלו את שורשי החרדה שלכם ולמדו כלים מעשיים להתמודדות יעילה. יחד נעבוד על הבנה עמוקה יותר והשגת רוגע נפשי.',
    sessionCount: 0,
    bgColor: '#F9D8D7',
  },
  {
    id: 5,
    type: ChatCategoriesEnum.BAD_HABITS,
    title: BAD_HABITS_TITLE,
    description:
      'שחרור מהרגלים רעים דורש זמן ולעיתים עזרה. אם אתם זקוקים לתמיכה כדי להיפטר מהם, אני כאן ללוות אתכם בתהליך ולסייע לכם לצעוד לעבר שינוי חיובי.',
    sessionCount: 0,
    bgColor: '#E8E6F3',
  },
];

export const REGA_INSTRUCTOR_ID = '648af8fb0e66f2955d2ecbc8';

export const CATEGORY_NAMES: Record<ChatCategoriesEnum | '', string> = {
  [ChatCategoriesEnum.BAD_HABITS]: 'הרגלים רעים',
  [ChatCategoriesEnum.ANXIETY]: 'חרדה',
  [ChatCategoriesEnum.NEGATIVE]: 'מחשבות שליליות',
  [ChatCategoriesEnum.SELF_DEV]: 'פיתוח עצמי',
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

export const CATEGORIES_TO_SHOW_IN_EXPLORE_CAROUSEL = [
  '5eca521e10fe0480d350c9b3', // On the road
  '61a8c014c9ff5226651bfcce', // Work
  '6396d1d93a56cd4a3a74f778', // Advanced
  '6476e7e7289563e63c577f94', // Visual
];

export type ExploreElement = {
  imageName: any;
  title: string;
  design: {
    height: number;
    width: number;
  };
  screenNavigation?: string;
  showAll?: 'sleep' | 'breathe';
  navigateToRega?: boolean;
};

export const EXPLORE_LINK_BUTTONS: ExploreElement[] = [
  {
    imageName: 'explore_breath',
    title: 'תרגילי נשימה',
    design: {
      height: 56,
      width: 56,
    },
    showAll: 'breathe',
  },
  {
    imageName: 'explore_sleep',
    title: 'שינה',
    design: {
      height: 56,
      width: 56,
    },
    showAll: 'sleep',
  },
  {
    imageName: 'explore_rega_tools',
    title: 'כלים מרגע',
    design: {
      height: 49,
      width: 42,
    },
    navigateToRega: true,
  },
  {
    imageName: 'explore_bg_music',
    title: 'מוזיקת רקע',
    design: {
      height: 49,
      width: 49,
    },
    screenNavigation: 'BGMusicPicker',
  },
];

export const EMAIL_CHECK_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
