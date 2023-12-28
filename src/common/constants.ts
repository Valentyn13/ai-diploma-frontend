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
