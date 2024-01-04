export const SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED';
export const SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON';
export const SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF';

export const BG_TRACKS = [
  {
    id: 0,
    name: 'תדרים',
    asset: 'frequencies.mp3',
  },
  {
    id: 1,
    name: 'אוקיינוס',
    asset: 'ocean.mp3',
  },
  { id: 2, name: 'ציפורים', asset: 'birds.mp3' },
  { id: 3, name: 'גלים', asset: 'waves.mp3' },
  { id: 4, name: 'קערות', asset: 'bowls.mp3' },
  { id: 5, name: 'גשם', asset: 'rain.mp3' },
] as const;

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
  { feeling: ['anxious'], location: ['study'], id: '5eca520c10fe0480d350c9a9' },
  { feeling: ['stressed'], location: ['bed'], id: '5eca520c10fe0480d350c98d' },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '602a6676410b770dd49e0d12',
  },
  {
    feeling: ['angry', 'unsure'],
    location: ['way'],
    id: '5eca520c10fe0480d350c9a0',
  },
  {
    feeling: ['unsure'],
    location: ['study', 'work'],
    id: '5eca520c10fe0480d350c9ab',
  },
  {
    feeling: ['anxious', 'unsure', 'stressed'],
    location: ['way', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c99d',
  },
  {
    feeling: ['sad'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '5eca520c10fe0480d350c992',
  },
  {
    feeling: ['unsure', 'stressed'],
    location: ['study', 'work', 'army'],
    id: '5eca520c10fe0480d350c997',
  },
  { feeling: ['anxious'], location: ['study'], id: '5eca520c10fe0480d350c9ae' },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c9a2',
  },
  {
    feeling: ['anxious', 'unsure', 'stressed'],
    location: ['home', 'work'],
    id: '61a8c296c9ff5226651bfcd8',
  },
  {
    feeling: ['stressed', 'sad'],
    location: ['home'],
    id: '63a90bfe49d0f8f7db26dc21',
  },
  {
    feeling: ['stressed'],
    location: ['home', 'study', 'work', 'army'],
    id: '6437c209c90514876f52622a',
  },
  {
    feeling: ['anxious', 'angry', 'unsure'],
    location: ['home', 'bed'],
    id: '644fc3948b29c767b4e6b66f',
  },
  {
    feeling: ['anxious', 'angry', 'unsure'],
    location: ['home'],
    id: '644fc4398b29c767b4e6b671',
  },
  {
    feeling: ['sad'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '6466156b8fd24279bde32ed1',
  },
  {
    feeling: ['sad'],
    location: ['home', 'work', 'army'],
    id: '6466169a8fd24279bde32ed2',
  },
  {
    feeling: ['angry', 'unsure', 'sad'],
    location: ['home', 'work'],
    id: '6482034d0e66f2955d2ecbb9',
  },
  {
    feeling: ['anxious', 'stressed', 'sad'],
    location: ['bed'],
    id: '649545120e66f2955d2ecbe9',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '64d2f01242357e4b9d18fe36',
  },
  {
    feeling: ['anxious', 'unsure', 'stressed'],
    location: ['home', 'work'],
    id: '64daea785d57908b4359d27a',
  },
  {
    feeling: ['anxious', 'angry', 'sad'],
    location: ['home', 'work'],
    id: '64f57470d1342603f4d29cf9',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '65093d7d1d1970cfe5ebe388',
  },
  {
    feeling: ['anxious', 'angry', 'unsure', 'stressed', 'sad', 'calm'],
    location: ['way'],
    id: '6537b3d1092f89755aeb901a',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '654c74b8ba86f01d58165692',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c994',
  },
  {
    feeling: ['anxious', 'angry', 'unsure'],
    location: ['way'],
    id: '5eca520c10fe0480d350c99c',
  },
  { feeling: ['stressed'], location: ['bed'], id: '5eca520c10fe0480d350c98e' },
  { feeling: ['anxious'], location: ['study'], id: '5eca520c10fe0480d350c995' },
  { feeling: ['anxious'], location: ['army'], id: '5eca520c10fe0480d350c998' },
  { feeling: ['stressed'], location: ['work'], id: '61a8becdc9ff5226651bfcc5' },
  {
    feeling: ['unsure', 'calm'],
    location: ['home', 'work'],
    id: '630b5093f77053953f6e6595',
  },
  {
    feeling: ['anxious', 'angry', 'unsure', 'calm'],
    location: ['home', 'bed'],
    id: '639b110473b17c70f878a685',
  },
  {
    feeling: ['angry', 'sad'],
    location: ['home'],
    id: '63aa61c65fbca84d76752332',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '63c0efce2c4099bc0e36e44f',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '64046109420a84635493a7fe',
  },
  {
    feeling: ['anxious', 'angry'],
    location: ['home', 'work'],
    id: '6437c1ddc90514876f526229',
  },
  {
    feeling: ['anxious'],
    location: ['home', 'study', 'work', 'army'],
    id: '643c1650bb731339805e903f',
  },
  {
    feeling: ['anxious', 'angry', 'unsure', 'stressed', 'calm'],
    location: ['way'],
    id: '647d9465a09dc890566da73e',
  },
  {
    feeling: ['unsure', 'calm'],
    location: ['home', 'work'],
    id: '64bf65afe361a71983a5f3ad',
  },
  {
    feeling: ['angry'],
    location: ['home', 'study', 'bed', 'work', 'army'],
    id: '650bf86a1d1970cfe5ebe38d',
  },
  { feeling: ['stressed'], location: ['bed'], id: '654c755bba86f01d58165694' },
  { feeling: ['unsure'], location: ['study'], id: '5eca520c10fe0480d350c9a4' },
  {
    feeling: ['unsure', 'stressed', 'calm'],
    location: ['bed'],
    id: '63c0edd62c4099bc0e36e441',
  },
  {
    feeling: ['anxious', 'angry', 'sad'],
    location: ['home', 'study', 'work', 'army'],
    id: '657147d0042258f6bc2d20a9',
  },
  {
    feeling: ['stressed'],
    location: ['study'],
    id: '5eca520c10fe0480d350c9ac',
  },
  {
    feeling: ['angry', 'unsure', 'stressed'],
    location: ['way'],
    id: '5eca520c10fe0480d350c99e',
  },
  { feeling: ['anxious'], location: ['home'], id: '5eca520c10fe0480d350c993' },
  {
    feeling: ['angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '5eca520c10fe0480d350c9a1',
  },
  { feeling: ['stressed'], location: ['home'], id: '647d94bba09dc890566da740' },
  {
    feeling: ['angry'],
    location: ['home', 'study', 'work', 'army'],
    id: '64fd6d0fc1bd701354997f99',
  },
  {
    feeling: ['anxious', 'angry', 'unsure', 'stressed', 'calm'],
    location: ['way'],
    id: '655707abef4c61fb4c3d8091',
  },
] as const;

export const COLLECTIONS_TIME_OF_DAY = [
  {
    id: 'morning',
    title: 'פתחו את היום',
    trackIds: [
      '64045fdb420a84635493a7f4',
      '6581265e887bd0b4c6e5f7a8',
      '64d2f15542357e4b9d18fe3b',
      '6578019e8498ee36f5128ad6',
      '63c4febdc1ab3549d358c3d0',
      '6437c209c90514876f52622a',
    ],
  },
  {
    id: 'noon',
    title: 'הפוגה באמצע היום',
    trackIds: [
      '65714e37042258f6bc2d20b1',
      '649543d10e66f2955d2ecbe7',
      '644fc3948b29c767b4e6b66f',
      '648c0c220e66f2955d2ecbd1',
      '6486c3290e66f2955d2ecbc1',
      '6437c1ddc90514876f526229',
      '6437c209c90514876f52622a',
    ],
  },
  {
    id: 'afternoon',
    title: 'לאחר שיא היום',
    trackIds: [
      '5eca520c10fe0480d350c997',
      '6537b2be092f89755aeb9016',
      '63c0efce2c4099bc0e36e44f',
      '644fc3948b29c767b4e6b66f',
      '64f57470d1342603f4d29cf9',
      '63aa61c65fbca84d76752332',
    ],
  },
  {
    id: 'evening',
    title: 'סוגרים יום בסיפוק',
    trackIds: [
      '64046020420a84635493a7f5',
      '649543530e66f2955d2ecbe6',
      '649546820e66f2955d2ecbea',
      '657147d0042258f6bc2d20a9',
      '65715043042258f6bc2d20bb',
      '657150c5042258f6bc2d20bd',
      '65714feb042258f6bc2d20b9',
    ],
  },
  {
    id: 'night',
    title: 'לקראת חלומות נעימים',
    trackIds: [
      '649545120e66f2955d2ecbe9',
      '63c0edd62c4099bc0e36e441',
      '649545460e66f2955d2ecbe9',
      '654c755bba86f01d58165694',
      '5eca520c10fe0480d350c98e',
      '5eca520c10fe0480d350c98f',
      '5eca520c10fe0480d350c990',
    ],
  },
];

export const COLLECTIONS = [
  {
    id: 'body-mind',
    title: 'אזנו בין גוף לנפש',
    trackIds: [
      '64954c1c0e66f2955d2ecbed',
      '649543530e66f2955d2ecbe6',
      '64954ae20e66f2955d2ecbec',
      '644fc4398b29c767b4e6b671',
      '644fc3948b29c767b4e6b66f',
      '63c0efce2c4099bc0e36e44f',
      '648c0c220e66f2955d2ecbd1',
      '62bd6c670888f539f97d85d0',
    ],
  },
  {
    id: 'quiet-soul',
    title: 'שקט לנשמה',
    trackIds: [
      '64954ae20e66f2955d2ecbec',
      '63c0efce2c4099bc0e36e44f',
      '657147d0042258f6bc2d20a9',
      '644fc4398b29c767b4e6b671',
      '638edb9e132405bcd302f6c1',
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
      '5eca520c10fe0480d350c9a8',
    ],
  },
  {
    id: 'basics',
    title: 'יסודות',
    trackIds: [
      '63c4fdf6c1ab3549d358c3ce',
      '63c4fe3ec1ab3549d358c3cf',
      '63c4fef7c1ab3549d358c3d1',
      '63c4ffbec1ab3549d358c3d2',
      '63c4fff9c1ab3549d358c3d3',
    ],
  },
  {
    id: 'self-connection',
    title: 'חיבור לפנימיות',
    trackIds: [
      '6404605b420a84635493a7f6',
      '6482034d0e66f2955d2ecbb9',
      '643fd04089ea3102dfe03b34',
      '6444fa6489ea3102dfe03b3f',
      '63b3fb8ae6e4abaf47376671',
      '64954a480e66f2955d2ecbeb',
      '649543530e66f2955d2ecbe6',
    ],
  },
  {
    id: 'reduce-stress',
    title: 'הפיגו חרדות ולחצים',
    trackIds: [
      '654c74b8ba86f01d58165692',
      '64d2f01242357e4b9d18fe36',
      '64bb80efb8394af97a9c0c0b',
      '6437c1ddc90514876f526229',
      '6404605b420a84635493a7f6',
      '63b4e6574f831d8583577623',
      '62bd72d20888f539f97d85eb',
    ],
  },
  {
    id: 'self-love',
    title: 'אהבה עצמית',
    trackIds: [
      '649543530e66f2955d2ecbe6',
      '64954c1c0e66f2955d2ecbed',
      '5eca520c10fe0480d350c993',
      '6482034d0e66f2955d2ecbb9',
      '6471b01a538c7fe78164398a',
      '643fd04089ea3102dfe03b34',
      '638edb9e132405bcd302f6c1',
      '648ff7420e66f2955d2ecbd5',
      '64d48aeefaae4c8530cb4c38',
      '64afe19abe04cd664e5f819e',
    ],
  },
  {
    id: 'healthy-life',
    title: 'לחיות בריא',
    trackIds: [
      '64954ae20e66f2955d2ecbec',
      '64954a480e66f2955d2ecbeb',
      '657147d0042258f6bc2d20a9',
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
      '63c4fff9c1ab3549d358c3d3',
      '63ce034c98817417bbcf9b69',
      '649543530e66f2955d2ecbe6',
      '644fc4038b29c767b4e6b670',
      '63c22de34e4c5b11918e609a',
      '644fc3948b29c767b4e6b66f',
      '638edb9e132405bcd302f6c1',
    ],
  },
  {
    id: 'better-sleep',
    title: 'לישון טוב יותר',
    trackIds: [
      '63c0edd62c4099bc0e36e441',
      '654c755bba86f01d58165694',
      '5eca520c10fe0480d350c98e',
      '648b02160e66f2955d2ecbcc',
      '63c22ac74e4c5b11918e6091',
      '5eca520c10fe0480d350c990',
      '5eca520c10fe0480d350c98f',
    ],
  },
];
