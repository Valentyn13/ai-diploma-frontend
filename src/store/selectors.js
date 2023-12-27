import { Platform } from 'react-native';
import { createSelector } from 'reselect';

const mapMeditations = category =>
  category.meditations.map(
    ({
      url,
      duration,
      _id,
      name,
      premium,
      createdAt,
      count,
      animation,
      thumbnail,
    }) => ({
      url,
      duration,
      name,
      id: _id,
      premium,
      categoryName: category?.name,
      categoryTitle: category?.title,
      createdAt,
      count,
      animation,
      thumbnail,
      isCategoryLocked: category.isCategoryLocked,
    }),
  );

const getCategories = state => state.appData.categories;
const getCourses = state => state.appData.courses;
const getInstructors = state => state.appData.instructors;
const getSelectedCategories = state => state.userPreferences.selectedCategories;

const findMeditation = (allMeditations, meditationId) =>
  allMeditations.find(({ id }) => id === meditationId);

export const allMeditations = createSelector(
  [getCategories, getCourses],
  (categories, courses) => [
    ...categories.reduce(
      (allMeds, category) => [...allMeds, ...mapMeditations(category)],
      [],
    ),
    ...courses.reduce(
      (allMeds, course) => [...allMeds, ...mapMeditations(course)],
      [],
    ),
  ],
);

export const allMeditationsButCourses = createSelector(
  [getCategories, getCourses],
  (categories, courses) => [
    ...categories.reduce(
      (allMeds, category) => [...allMeds, ...mapMeditations(category)],
      [],
    ),
  ],
);

export const homeMeditationsSelector = createSelector(
  [getCategories, getSelectedCategories],
  (categories, selectedCategories) => {
    selectedCategories = selectedCategories.map(item => item.toLowerCase());

    let filteredCategories = categories.filter(({ name }) =>
      selectedCategories.includes(name.toLowerCase()),
    );

    if (filteredCategories.length === 0) {
      filteredCategories = categories.length > 0 ? [categories[0]] : [];
    }

    return filteredCategories.reduce(
      (meds, category) => [...meds, ...mapMeditations(category)],
      [],
    );
  },
);

export const categoriesSelector = createSelector([getCategories], categories =>
  categories
    .filter(category => !category.hideInMeditations)
    .map(category => {
      const { _id, name, title, info, order, isCategoryLocked, height } =
        category;
      return {
        id: _id,
        name,
        title,
        info,
        meditations: mapMeditations(category),
        order,
        isCategoryLocked,
        height,
      };
    }),
);

export const homeCategoriesSelector = createSelector(
  [getCategories],
  categories =>
    categories
      .filter(category => category.showInHome)
      .map(category => {
        const { _id, name, title, info, order, isCategoryLocked, height } =
          category;
        return {
          id: _id,
          name,
          title,
          info,
          meditations: mapMeditations(category),
          order,
          isCategoryLocked,
          height,
        };
      }),
);

export const coursesSelector = createSelector([getCourses], courses => {
  const mappedCourses = courses.map(course => {
    const { _id, name, title, info, subTitle, isCategoryLocked } = course;
    return {
      id: _id,
      name,
      title,
      info,
      subTitle,
      meditations: mapMeditations(course),
      isCategoryLocked,
    };
  });

  if (Platform.OS === 'android') {
    mappedCourses.reverse();
  }

  return mappedCourses;
});

export const firstCourseSelector = createSelector([getCourses], courses => {
  const mappedCourses = courses.map(course => {
    const { _id, name, title, info, subTitle, isCategoryLocked } = course;
    return {
      id: _id,
      name,
      title,
      info,
      subTitle,
      meditations: mapMeditations(course),
      isCategoryLocked,
    };
  });

  if (mappedCourses.length > 0) {
    return mappedCourses[0];
  }
  return null;
});

export const favoriteMeditationsSelector = createSelector(
  [allMeditations, state => state.userPreferences.favoriteMeditations],
  (allMeds, favMeds) => {
    const favourite = [];
    const fave = Object.keys(favMeds);

    allMeds.map(item => {
      fave.map(value => {
        if (value === item.id) {
          favourite.push(item);
        }
      });
    });
    return favourite.length > 0 ? favourite : [];
  },
);

export const practiceHistorySelector = createSelector(
  [
    allMeditations,
    state => state.userProgress.meditationsPracticed,
    state => state.userProgress.badgesAchieved,
  ],
  (allMeds, practicedMeds, badges) => {
    const meds = practicedMeds.map(({ id, timestamp }) => {
      const data = findMeditation(allMeds, id);
      if (data) {
        const { name, duration, categoryTitle, isCategoryLocked } = data;
        return {
          id,
          timestamp,
          name,
          duration,
          categoryTitle,
          isCategoryLocked,
        };
      }
    });

    meds.filter(x => x !== undefined);
    const history = [
      ...meds.map(med => ({
        ...med,
        type: 'meditation',
      })),
      ...badges.map(badge => ({
        ...badge,
        type: 'badge',
      })),
    ];

    return history.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    );
  },
);

export const latestMeditationSelector = createSelector(
  [getCategories],
  categories => {
    const latest = categories.reduce(
      (meds, category) => [...meds, ...mapMeditations(category)],
      [],
    );

    latest.sort(function (a, b) {
      if (!a.createdAt) {
        return 1;
      }
      if (!b.createdAt) {
        return -1;
      }
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    const seenIds = {};
    const uniqueArray = latest.filter(item => {
      if (seenIds[item.id]) {
        return false;
      }
      seenIds[item.id] = true;
      return true;
    });

    return uniqueArray.slice(0, 9);
  },
);

export const toptMeditationSelector = createSelector(
  [getCategories],
  categories => {
    let topRated = categories.reduce(
      (meds, category) => [...meds, ...mapMeditations(category)],
      [],
    );
    // filter duplicates
    const names = topRated.map(item => item.name);
    topRated = topRated.filter(
      (value, index) => names.indexOf(value.name) === index,
    );
    topRated.sort((a, b) => b.count - a.count);
    return topRated.slice(0, 9);
  },
);

export const meditationInstructor = createSelector(
  [getInstructors, (_state, meditationId) => meditationId],
  (instructors, meditationId) =>
    instructors?.find(instructor =>
      instructor?.categories?.includes(meditationId),
    ),
);
