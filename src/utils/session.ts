import { stringToDate } from '@utils/string';
import { PracticedMeditation } from 'types/Meditation';

type WithCreatedAt = { createdAt: Date | string };

export function isRecent(session: WithCreatedAt, days = 7) {
  const createdAt = new Date(session.createdAt);
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const diffDays = diff / (1000 * 3600 * 24);
  return diffDays < days;
}

export function isCreatedThisWeek(session: PracticedMeditation): boolean {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentDate = now.getDate();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(currentDate - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(now);
  endOfWeek.setDate(currentDate + (6 - dayOfWeek));
  endOfWeek.setHours(23, 59, 59, 999);

  const sessionDate = stringToDate(session.timestamp);

  return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
}
