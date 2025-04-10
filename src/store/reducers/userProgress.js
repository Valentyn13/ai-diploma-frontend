import {
  SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED,
  SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF,
  SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON,
} from '@common/constants';
import { REHYDRATE } from 'redux-persist';

import * as actions from '../actions';

const MINUTES_PRACTICED_TO_SHOW_REMINDER_POPUP = 2;

const initialState = {
  minutesPracticed: 0,
  meditationsPracticed: [],
  badgesAchieved: [],
  shouldShowReminderPopup: SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED,
};

const userProgress = (state = initialState, { type, payload }) => {
  switch (type) {
    case REHYDRATE: {
      return {
        ...((payload && payload.userProgress) || initialState),
        shouldShowReminderPopup:
          payload &&
          payload.userProgress &&
          payload.userProgress.minutesPracticed >
            MINUTES_PRACTICED_TO_SHOW_REMINDER_POPUP
            ? SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF
            : SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED,
      };
    }
    case actions.login.actionName: {
      if (payload.userProgress) {
        const {
          userProgress: {
            minutesPracticed,
            meditationsPracticed,
            badgesAchieved,
          },
        } = payload;
        return {
          minutesPracticed: minutesPracticed || 0,
          meditationsPracticed: meditationsPracticed || [],
          badgesAchieved: badgesAchieved || [],
          shouldShowReminderPopup:
            minutesPracticed > MINUTES_PRACTICED_TO_SHOW_REMINDER_POPUP
              ? SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF
              : SHOULD_SHOW_REMINDER_POPUP_STATUS_NOT_INITIALIED,
        };
      }
      return state;
    }
    case actions.minutesPracticed.actionName: {
      const { minutesPlayed } = payload;
      const { minutesPracticed, shouldShowReminderPopup } = state;
      const shouldShowReminderPopupNewValue =
        shouldShowReminderPopup !==
          SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_OFF &&
        minutesPracticed + minutesPlayed >
          MINUTES_PRACTICED_TO_SHOW_REMINDER_POPUP
          ? SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON
          : shouldShowReminderPopup;

      return {
        ...state,
        shouldShowReminderPopup: shouldShowReminderPopupNewValue,
        minutesPracticed: minutesPracticed + minutesPlayed,
      };
    }
    case actions.logout.actionName:
      return initialState;
    // return state;
    default:
      return state;
  }
};

export default userProgress;
