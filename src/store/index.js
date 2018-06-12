import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import middleWares from './middlewares';

const App = combineReducers(reducers);
const store = createStore(App, applyMiddleware(...middleWares));

export default store;
