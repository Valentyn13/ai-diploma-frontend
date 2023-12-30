const AUTH_API = 'auth';
const USER_API = 'users';
const MEDITATIONS_API = 'meditations';
const ARTICLES_API = 'articles';

export interface IApi {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  setAuthToken?: boolean;
}

const API: { [key: string]: IApi } = {
  register: {
    url: `${AUTH_API}/register`,
    method: 'post',
  },
  login: {
    url: `${AUTH_API}/login`,
    method: 'post',
  },
  refreshToken: {
    url: `${AUTH_API}/refresh-token`,
    method: 'post',
  },
  facebook: {
    url: `${AUTH_API}/facebook`,
    method: 'post',
  },
  apple: {
    url: `${AUTH_API}/apple`,
    method: 'post',
  },
  // USER API
  profile: {
    url: `${USER_API}/profile`,
    method: 'get',
  },
  syncUserPreferences: {
    url: `${USER_API}/preferences/:userId`,
    method: 'post',
    setAuthToken: true,
  },
  syncUserProgress: {
    url: `${USER_API}/progress/:userId`,
    method: 'post',
    setAuthToken: true,
  },
  deleteUserData: {
    url: `${USER_API}/deleteUserData/:userId`,
    method: 'get',
    setAuthToken: true,
  },
  updateProfile: {
    url: `${USER_API}/updateProfile/:userId`,
    method: 'post',
  },
  changePassword: {
    url: `${USER_API}/changePassword/:userId`,
    method: 'post',
  },
  cancelSubsciption: {
    url: `${USER_API}/cancelSubsciption/:userId`,
    method: 'post',
  },
  saveNotification: {
    url: `${USER_API}/saveNotification/:userId`,
    method: 'post',
    setAuthToken: true,
  },
  cancelNotification: {
    url: `${USER_API}/cancelNotification/:userId`,
    method: 'post',
    setAuthToken: true,
  },
  // MEDITATIONS API
  meditations: {
    url: `${MEDITATIONS_API}/all`,
    method: 'get',
    setAuthToken: true,
  },
  updateMeditationCount: {
    url: `${MEDITATIONS_API}/UpdateMeditationCount`,
    method: 'post',
    setAuthToken: true,
  },
  instructor_tractionData: {
    url: 'instructor_tractionData/',
    method: 'post',
    setAuthToken: true,
  },
  // ARTICLES_API
  articles: {
    url: `${ARTICLES_API}/`,
    method: 'get',
    setAuthToken: true,
  },
};

export default API;
