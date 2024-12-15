import { REHYDRATE } from 'redux-persist';

import * as actions from '../actions';

const initialState = {
  id: null,
  fbId: null,
  email: null,
  name: null,
  accessToken: null,
  refreshToken: null,
  sex: '',
  loder: false,
  updateloader: false,
  isNotification: false,
  notificationTime: null,
  hasPassedStarterChat: false,
};

const userDetails = (state = initialState, { type, payload }) => {
  switch (type) {
    case REHYDRATE: {
      return {
        ...((payload && payload.userDetails) || initialState),
        loder: false,
      };
    }
    case actions.setLoder.actionName: {
      return {
        ...state,
        loder: true,
      };
    }
    case actions.setLoaderFalse.actionName: {
      return {
        ...state,
        loder: false,
      };
    }
    case actions.login.actionName: {
      const {
        id,
        email,
        name,
        accessToken,
        refreshToken,
        sex,
        isNotification,
        notificationTime,
      } = payload;
      return {
        ...state,
        id,
        email,
        name,
        accessToken,
        refreshToken,
        sex,
        isNotification,
        notificationTime,
        loder: false,
      };
    }
    case actions.setUserStarterChatPassed.actionName: {
      const { accepted } = payload;
      return {
        ...state,
        hasPassedStarterChat: accepted,
      };
    }

    case actions.setUserData.actionName: {
      const { isNotification, notificationTime } = payload;
      return {
        ...state,
        isNotification,
        notificationTime,
        hasPassedStarterChat: payload.hasPassedStarterChat || false,
      };
    }
    case actions.updateProfile.actionName: {
      return {
        ...state,
        updateloader: true,
      };
    }
    case actions.setUpdateLoaderFalse.actionName: {
      const { name, sex } = payload;
      return {
        ...state,
        updateloader: false,
        sex,
        name,
      };
    }
    case actions.changePassword.actionName: {
      return {
        ...state,
        updateloader: false,
      };
    }
    case actions.setAccessToken.actionName: {
      const { accessToken, refreshToken } = payload;
      return {
        ...state,
        accessToken,
        refreshToken,
      };
    }
    case actions.chooseSex.actionName: {
      const { sex } = payload;
      return {
        ...state,
        sex,
      };
    }
    case actions.logout.actionName:
      return initialState;
    default:
      return state;
  }
};

export default userDetails;
