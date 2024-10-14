import { Category } from 'types/Category';
import { Session } from 'types/Meditation';

const querySession = (
  categoryName: string,
  meditationName: string,
  instructorName: string,
  query: string,
) =>
  categoryName.toLowerCase().includes(query.toLowerCase()) ||
  meditationName.toLowerCase().includes(query.toLowerCase()) ||
  instructorName.toLowerCase().includes(query.toLowerCase());

export function querySessions(
  categories: Category[],
  instructors: any[],
  query: string,
) {
  if (query.length < 3) {
    return categories.reduce(
      (acc, category) => [...acc, ...category.meditations],
      [] as Session[],
    );
  }

  return categories.reduce((acc, category) => {
    const sessions = category.meditations.filter(session =>
      querySession(
        category.title,
        session.name,
        instructors.find(i => i.categories.includes(session.id))?.name ||
          'default',
        query,
      ),
    );

    return [...acc, ...sessions];
  }, [] as Session[]);
}
