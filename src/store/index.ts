import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import * as reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails'],
};

export default function configureStore() {
  const reducer = combineReducers<any>({
    ...reducers,
  });

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  return { store, persistor };
}
