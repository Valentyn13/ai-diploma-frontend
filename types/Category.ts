import { Session } from './Meditation';

export interface Category {
  id: string;
  title: string;
  info?: string | null;
  height?: string;
  meditations: Session[];
  order: number;
}
