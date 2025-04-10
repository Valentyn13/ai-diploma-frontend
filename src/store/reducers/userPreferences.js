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
