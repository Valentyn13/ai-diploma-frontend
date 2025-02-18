import * as actions from '../actions';

const initialState = {
  loaded: false,
  courses: [],
  categories: [],
  instructors: [],
  meditationsByTimeOfTheDay: [],
  meditationsByCategories: [],
};

const appData = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.setAppData.actionName: {
      const {} = payload;
      return {
        loaded: true,
      };
    }
    case actions.logout.actionName:
      return initialState;
    default:
      return state;
  }
};

export default appData;
