import api from '@services/api';

import useAxios from './useAxios';

export default () => {
  const updateIstructorTractionDataApi = useAxios({
    api: api.instructor_tractionData,
    shouldDispatch: () => false,
  });

  const updateIstructorTractionData = data => {
    const { fetch } = updateIstructorTractionDataApi;

    fetch({ data });
  };

  return {
    updateIstructorTractionData,
  };
};
