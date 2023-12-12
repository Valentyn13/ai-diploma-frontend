import * as actions from '../actions';

const initialState = {
  loaded: false,
  courses: [],
  categories: [],
  instructors: [],
};

const appData = (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.setAppData.actionName: {
      const {courses, categories, instructors} = payload;
      return {
        loaded: true,
        courses,
        categories,
        instructors,
      };
    }
    case actions.logout.actionName:
      return initialState;
    default:
      return state;
  }
};

export default appData;
