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
    asset: require('@common/assets/sounds/ocean.mp3'),
  },
  {
    id: 1,
    name: 'תדרים',
    asset: require('@common/assets/sounds/frequencies.mp3'),
  },
  { id: 2, name: 'ציפורים', asset: require('@common/assets/sounds/birds.mp3') },
  { id: 3, name: 'גלים', asset: require('@common/assets/sounds/waves.mp3') },
  { id: 4, name: 'קערות', asset: require('@common/assets/sounds/bowls.mp3') },
  { id: 5, name: 'גשם', asset: require('@common/assets/sounds/rain.mp3') },
] as const;
