export const SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED';
export const SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON';
export const SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF =
  'SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF';

export const BG_TRACKS = [
  {
    id: 0,
    name: 'אוקיינוס',
    asset: 'ocean.mp3',
  },
  {
    id: 1,
    name: 'תדרים',
    asset: 'frequencies.mp3',
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
