import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers';
import middleWares from './middlewares';

const App = combineReducers(reducers);
const store = createStore(App, composeWithDevTools(applyMiddleware(...middleWares)));

export default store;
