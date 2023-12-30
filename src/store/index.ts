import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import badgesMiddleware from './middlewares/badgesMiddleware';
import * as reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails', 'userPreferences', 'userProgress'],
};

export default function configureStore() {
  const reducer = combineReducers<any>({
    ...reducers,
  });

  const persistedReducer = persistReducer(persistConfig, reducer);
  const enhancer = compose(applyMiddleware(badgesMiddleware));
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}
