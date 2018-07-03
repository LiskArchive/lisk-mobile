import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Router from './components/router';
import Loading from './components/loading';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Router />
      <Loading />
    </Fragment>
  </Provider>
);

export default App;
