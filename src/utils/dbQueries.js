import { categories, instructors, meditations } from '../db';

export const categoryMeditations = id =>
  meditations.filter(({ category }) => category === id);

export const instructorById = instructorId => {
  const instructor = instructors.find(({ id }) => id === instructorId);
  return instructor || { info: '' };
};

export const meditationCategory = id =>
  categories.find(
    ({ id: catId }) =>
      catId === meditations.find(({ id: medId }) => id === medId).category,
  );
