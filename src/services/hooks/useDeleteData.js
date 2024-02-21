import api from '@services/api';
import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import useAxios from './useAxios';

export default () => {
  const dispatch = useDispatch();

  const deleteUserData = useAxios({
    api: api.deleteUserData,
    shouldDispatch: () => false,
  });

  const { fetch: fetchMeditations } = deleteUserData;

  const DeleteUserData = useCallback(() => {
    fetchMeditations();
  }, [fetchMeditations]);

  const { completed, data } = deleteUserData;
  const message = `בקשתך למחיקת נתונים נשלחה לאחד ממנהלי האפליקציות שלנו,
הנתונים שיימחקו יהיו לגבי השימושים שלך, מידע אישי, אישורים ושמך האישי.
תוך עד 24 שעות שכל הנתונים שיצהירו נמחקו.`;
  useEffect(() => {
    if (completed) {
      Alert.alert(message);
    }
  }, [dispatch, completed, data, message]);

  const sendCancelSubscription = useAxios({
    api: api.cancelSubsciption,
    shouldDispatch: () => false,
  });

  const cancelSubscription = reason => {
    const { fetch } = sendCancelSubscription;
    fetch({ data: { reason } });
  };

  return {
    DeleteUserData,
    cancelSubscription,
  };
};
