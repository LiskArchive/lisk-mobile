import React from 'react';
import { Provider } from 'react-redux';
import Router from './components/router';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
