import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import * as reducers from './reducers';
import badgesMiddleware from './middlewares/badgesMiddleware';

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = (composeWithDevTools && composeWithDevTools({})) || compose;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails', 'userPreferences', 'userProgress',],
};

export default function configureStore() {
  const reducer = combineReducers({
    ...reducers,
  });

  const persistedReducer = persistReducer(persistConfig, reducer);
  const enhancer = composeEnhancers(applyMiddleware(badgesMiddleware));
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}
