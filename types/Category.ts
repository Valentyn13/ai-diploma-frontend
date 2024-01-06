import { Meditation } from './Meditation';

export interface Category {
  id: string;
  title: string;
  info?: string | null;
  height?: string;
  meditations: Meditation[];
  order: number;
}
