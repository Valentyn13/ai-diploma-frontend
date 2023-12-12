import * as actions from '../actions';

const minutesCompleted = (action, state, minutes) => {
  const {type} = action;
  if (type === actions.minutesPracticed.actionName) {
    const {
      userProgress: {minutesPracticed},
    } = state;
    const {
      payload: {minutesPlayed},
    } = action;
    return minutesPracticed < minutes && minutesPracticed + minutesPlayed >= minutes;
  }
  return false;
};

const meditationsCompleted = (action, state, count) => {
  const {type} = action ? action : null;

  if (type === actions.meditationStarted.actionName) {
    const {
      userProgress: {meditationsPracticed},
    } = state;
    return meditationsPracticed.length + 1 === count;
  }
  return false;
};

const badges = {
  consecutiveWeekPracticed: () => false,
  firstCourseCompleted: () => false,
  firstMeditation: (action, state) => {
    const {type} = action ? action : {};
    const {
      userProgress: {meditationsPracticed},
    } = state;
    return type === actions?.meditationStarted?.name && meditationsPracticed?.length === 0;
  },
  categoryCompleted: () => false,
  practiced50Min: (action, state) => minutesCompleted(action, state, 50),
  practiced100Min: (action, state) => minutesCompleted(action, state, 100),
  practiced150Min: (action, state) => minutesCompleted(action, state, 150),
  practiced5Meditations: (action, state) => meditationsCompleted(action, state, 5),
  practiced15Meditations: (action, state) => meditationsCompleted(action, state, 15),
  practiced25Meditations: (action, state) => meditationsCompleted(action, state, 25),
};

const badgesMiddleware = ({dispatch, getState}) => next => action => {
  if (action) {
    Object.entries(badges).map(([badge, shouldApply]) => {
      if (shouldApply(action, getState())) {
        dispatch(actions.badgeAchieved({badge}));
      }
      return null;
    });

    return next(action);
  }
};

export default badgesMiddleware;
