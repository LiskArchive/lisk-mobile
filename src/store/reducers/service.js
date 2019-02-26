import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';

export const INITIAL_STATE = {
  priceTicker: {},
};

const service = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.pricesRetrieved:
      return merge(state, { priceTicker: action.priceTicker });
    default:
      return state;
  }
};

export default service;
