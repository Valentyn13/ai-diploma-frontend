// import React, {useEffect, useCallback} from 'react';
import api from '@services/api';

// import {useDispatch, useSelector} from 'react-redux';
// import {setUpdateLoaderFalse} from '@store/actions';
import useAxios from './useAxios';

export default () => {
  // const dispatch = useDispatch();

  const updateMeditationCountApi = useAxios({
    api: api.updateMeditationCount,
    shouldDispatch: () => false,
  });

  const updateMeditationCount = data => {
    const { fetch } = updateMeditationCountApi;
    // console.log('fetch', fetch);
    fetch({ data });
  };

  return {
    updateMeditationCount,
  };
};
