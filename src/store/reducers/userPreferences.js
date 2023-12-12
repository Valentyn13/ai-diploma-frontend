import * as actions from '../actions';

const initialState = {
  selectedCategories: [],
  experience: null,
  favoriteMeditations: {},

};

const userPreferences = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.login.actionName: {
      if (payload.userPreferences) {
        const {
          userPreferences: { selectedCategories, favoriteMeditations },
        } = payload;
        return {
          selectedCategories: selectedCategories || [],
          favoriteMeditations: favoriteMeditations
            ? favoriteMeditations.reduce(
              (obj, med) => ({
                ...obj,
                [med]: true,
              }),
              {},
            )
            : {},
        };
      }
      return state;
    }

    case actions.addFavoriteMeditation.actionName: {
      const { meditationId } = payload;
      const { favoriteMeditations } = state;
      return {
        ...state,
        favoriteMeditations: {
          ...favoriteMeditations,
          [meditationId]: true,
        },
      };
    }
    case actions.removeFavoriteMeditation.actionName: {
      const { meditationId } = payload;
      const { favoriteMeditations } = state;
      const { [meditationId]: removed, ...rest } = favoriteMeditations;
      return {
        ...state,
        favoriteMeditations: rest,
      };
    }
    case actions.chooseCategories.actionName: {
      const { categories } = payload;
      return {
        ...state,
        selectedCategories: categories,
      };
    }
    case actions.chooseExperience.actionName: {
      const { experience } = payload;
      return {
        ...state,
        experience,
      };
    }
    case actions.logout.actionName:
      return initialState;
    default:
      return state;
  }
};

export default userPreferences;
