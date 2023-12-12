import api from '@services/api';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArticleData } from 'store/actions';

import useAxios from './useAxios';

export default () => {
  const dispatch = useDispatch();

  const articleApi = useAxios({
    api: api.articles,
    shouldDispatch: () => false,
  });

  const { fetch } = articleApi;

  const getArticleData = useCallback(() => {
    fetch();
  }, [fetch]);

  const { completed, data } = articleApi;

  useEffect(() => {
    if (completed && data) {
      dispatch(setArticleData(data));
    }
  }, [dispatch, completed, data]);

  return {
    getArticleData,
  };
};
