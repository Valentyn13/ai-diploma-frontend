import { Category } from 'types/Category';
import { Meditation } from 'types/Meditation';

const queryInMeditation = (meditation: Meditation, query: string) => {
  return meditation.name.toLowerCase().includes(query.toLowerCase());
};

function searchInMeditations(meditations: Meditation[], query: string) {
  return meditations.filter(meditation => {
    return queryInMeditation(meditation, query);
  });
}

const queryInCategory = (category: Category, query: string) => {
  if (category.title.toLowerCase().includes(query.toLowerCase())) {
    return true;
  }

  return category.meditations.some(meditation => {
    return queryInMeditation(meditation, query);
  });
};

export function searchInCategories(categories: Category[], query: string) {
  return categories
    .filter(category => {
      return queryInCategory(category, query);
    })
    .map(category => {
      if (category.title.toLowerCase().includes(query.toLowerCase())) {
        return category;
      }

      return {
        ...category,
        meditations: searchInMeditations(category.meditations, query),
      };
    });
}
