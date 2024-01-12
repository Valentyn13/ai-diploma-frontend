import api from '@services/api';
import * as actions from '@store/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useAxios from './useAxios';

export default () => {
  const dispatch = useDispatch();
  // const userDetails = useSelector(state => state.userDetails);

  const updateProfileApi = useAxios({
    api: api.updateProfile,
    shouldDispatch: () => false,
  });

  const changePasswordApi = useAxios({
    api: api.changePassword,
    shouldDispatch: () => false,
  });

  const saveNotificationApi = useAxios({
    api: api.saveNotification,
    shouldDispatch: () => false,
  });

  const cancelNotificationApi = useAxios({
    api: api.cancelNotification,
    shouldDispatch: () => false,
  });

  const updateProfile = data => {
    const { fetch } = updateProfileApi;
    dispatch(actions.updateProfile());
    fetch({ data });
  };

  const { completed, data } = updateProfileApi;

  useEffect(() => {
    if (completed) {
      dispatch(actions.setUpdateLoaderFalse(data));
    }
  }, [completed, data, dispatch]);

  const changePassword = changePasswordData => {
    const { fetch } = changePasswordApi;
    dispatch(updateProfile());
    fetch({ data: changePasswordData });
  };

  const { completed: changePasswordCompleted, data: changePasswordData } =
    changePasswordApi;

  useEffect(() => {
    if (changePasswordCompleted) {
      // console.log('data', changePasswordData);
      dispatch(actions.changePassword());
    }
  }, [changePasswordCompleted, changePasswordData, dispatch]);

  const saveNotification = saveNotificaitonData => {
    const { fetch } = saveNotificationApi;
    fetch({ data: saveNotificaitonData });
  };

  const cancelNotification = () => {
    const { fetch } = cancelNotificationApi;
    fetch();
  };

  return {
    updateProfile,
    changePassword,
    saveNotification,
    cancelNotification,
  };
};
