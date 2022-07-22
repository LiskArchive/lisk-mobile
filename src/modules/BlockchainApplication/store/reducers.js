import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import actionTypes from './actionTypes';

/**
 * Initial State
 * @param {Array} state
 * @param {Object} action
 */
const initialState = {
  pins: [],
  applications: {},
  current: null,
};

/**
 *
 * @param {Object} state
 * @param {type: String, chainId: string} action
 */
export const pinsReducer = (state = initialState.pins, { type, chainId }) => {
  switch (type) {
    case actionTypes.toggleApplicationPin:
      if (chainId && state.includes(chainId)) {
        return state.filter((pinnedChainId) => pinnedChainId !== chainId);
      }
      return chainId ? [...state, chainId] : [...state];

    default:
      return state;
  }
};

/**
 *
 * @param {Object} state
 * @param {type: String, data: Object} action
 */
export const applicationsReducer = (
  state = initialState.applications,
  { type, applications, application, chainId }
) => {
  switch (type) {
    case actionTypes.setApplications:
      state = applications.reduce((acc, app) => ({ ...acc, [app.chainID]: app }), {});
      return state;
    case actionTypes.addApplicationByChainId:
      // In cases where a new node for an existing application is being added,
      // the new service url should be appended to the serviceURLs array of the application
      if (application.chainID in state) {
        state[application.chainID].serviceURLs.push(application.serviceURLs);
      } else {
        state[application.chainID] = application;
      }
      return state;

    case actionTypes.deleteApplicationByChainId: {
      delete state[chainId];
      return { ...state };
    }

    default:
      return state;
  }
};

/**
 *
 * @param {Object} state
 * @param {type: String, application: Object} action
 */
export const currentReducer = (state = null, { type, application }) => {
  switch (type) {
    case actionTypes.setCurrentApplication:
      return application;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'blockchainApplications',
  storage: AsyncStorage,
  whitelist: ['pins', 'applications'],
  blacklist: ['current'],
};

const blockchainApplicationsReducer = combineReducers({
  pins: pinsReducer,
  applications: applicationsReducer,
  current: currentReducer,
});

const blockchainApplications = persistReducer(persistConfig, blockchainApplicationsReducer);

export default blockchainApplications;
