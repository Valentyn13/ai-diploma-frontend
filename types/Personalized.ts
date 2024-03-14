import { PERSONALIZED_STATES } from '@common/constants';

export interface PersonalizedState {
  key: string;
  label: string;
  emoji: string;
  color: string;
}

export type PersonalizedLabel = (typeof PERSONALIZED_STATES)[number]['label'];
export type PersonalizedKey = (typeof PERSONALIZED_STATES)[number]['key'];
export type TimeSlot = 10 | 20 | 60;
