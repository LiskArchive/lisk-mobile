import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';

export const INITIAL_STATE = {
  priceTicker: {},
  dynamicFees: {},
};

const service = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.pricesRetrieved:
      return merge(state, { priceTicker: action.priceTicker });

    case actionTypes.dynamicFeesRetrieved:
      return merge(state, { dynamicFees: action.dynamicFees });

    default:
      return state;
  }
};

export default service;
