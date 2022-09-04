import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actionTypes from '../actionTypes';

/**
 *
 * @param {Object} state
 * @param {type: String, encryptedAccount: Object} action
 */
export const list = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.addBookmark:
      return [...state, payload];
    case actionTypes.editBookmark:
      return state.map(acc => {
        if (acc.address === payload.address) {
          return payload;
        }
        return acc;
      });
    case actionTypes.deleteBookmark:
      return state.filter(acc => acc.address !== payload.address);
    default:
      return state;
  }
};

const persistConfig = {
  key: 'bookmarks',
  storage: AsyncStorage,
  whitelist: ['list'], // only navigation will be persisted
};

const bookmarkReducer = combineReducers({ list });

// eslint-disable-next-line import/prefer-default-export
const bookmark = persistReducer(persistConfig, bookmarkReducer);

export default bookmark;
