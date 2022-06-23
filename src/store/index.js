import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import * as reducers from './reducers';
import middleWares from './middlewares';

export * from './selectors';

const rootReducer = combineReducers(reducers);
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);
export const persistedStore = persistStore(store);

export default store;
