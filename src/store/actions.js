const createAction = action => {
  const f = payload => ({
    type: action,
    payload,
  });
  f.actionName = action;
  return f;
};

export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');
export const setAccessToken = createAction('SET_ACCESS_TOKEN');
export const setLoder = createAction('SET_LODER');
export const setLoaderFalse = createAction('SET_LOADER_FALSE');
export const setUserData = createAction('SET_USER_DATA');
export const setArticleData = createAction('SET_ARTICLE_DATA');

export const updateProfile = createAction('UPDATE_PROFILE');
export const setUpdateLoaderFalse = createAction('SET_UPDATE_LOADER_FALSE');

export const changePassword = createAction('CHANGE_PASSWORD');
export const minutesPracticed = createAction('MINUTES_PRACTICED');
export const meditationStarted = createAction('MEDITATION_STARTED');
export const badgeAchieved = createAction('BADGE_ACHIEVED');

export const chooseSex = createAction('CHOOSE_SEX');
export const chooseExperience = createAction('CHOOSE_EXPERIENCE');
export const chooseCategories = createAction('CHOOSE_CATEGORIES');
// export const addFcmToken = createAction('ADD_FCM_TOCKEN');

export const addFavoriteMeditation = createAction('ADD_FAVORITE_MEDITATION');
export const removeFavoriteMeditation = createAction('REMOVE_FAVORITE_MEDITATION');

export const setAppData = createAction('SET_APP_DATA');

export const cancelSubscription = createAction('CANCEL_SUBSCRIPTION');

export const turnOffShowReminderPopup = createAction('TURN_OFF_SHOW_REMINDER_POPUP');
