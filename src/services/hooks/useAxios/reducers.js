export const initialResponse = {
  data: {},
  error: null,
  loading: false,
};

export const actions = {
  init: 'init',
  success: 'success',
  fail: 'fail',
};

export function responseReducer(_state, action) {
  switch (action.type) {
    case actions.init:
      return {
        data: {},
        error: null,
        loading: true,
      };
    case actions.success:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    case actions.fail:
      return {
        data: {},
        error: action.payload,
        loading: false,
      };
    default:
      return initialResponse;
  }
}
