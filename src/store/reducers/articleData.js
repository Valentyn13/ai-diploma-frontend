import * as actions from '../actions';

const initialState = {
  loaded: false,
  articles: [],
};

const articleData = (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.setArticleData.actionName: {
      const {articles} = payload;
      return {
        loaded: true,
        articles,
      };
    }
    default:
      return state;
  }
};

export default articleData;
