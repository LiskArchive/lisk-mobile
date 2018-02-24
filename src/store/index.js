import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import actionTypes from '../constants/actions';
import * as reducers from './reducers';
import middleWares from './middlewares';

const App = combineReducers(reducers);
const store = createStore(App, applyMiddleware(...middleWares));

export default store;
