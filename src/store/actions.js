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
export const setUserStarterChatPassed = createAction(
  'SET_USER_STARTER_CHAT_PASSED',
);

export const updateProfile = createAction('UPDATE_PROFILE');
export const setUpdateLoaderFalse = createAction('SET_UPDATE_LOADER_FALSE');

export const changePassword = createAction('CHANGE_PASSWORD');
export const minutesPracticed = createAction('MINUTES_PRACTICED');

export const chooseSex = createAction('CHOOSE_SEX');
export const chooseExperience = createAction('CHOOSE_EXPERIENCE');
export const chooseCategories = createAction('CHOOSE_CATEGORIES');

export const setAppData = createAction('SET_APP_DATA');
