import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';
import { tokenKeys } from '../../constants/tokens';

export const INITIAL_STATE = {
  priceTicker: tokenKeys.reduce(
    (info, tokenKey) =>
      merge(info, {
        [tokenKey]: {},
      }),
    {}
  ),
  dynamicFees: {},
};

const service = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.pricesRetrieved:
      return merge(state, {
        priceTicker: tokenKeys.reduce(
          (info, tokenKey) =>
            merge(info, {
              [tokenKey]:
                tokenKey === action.data.activeToken
                  ? action.data.priceTicker
                  : state.priceTicker[tokenKey],
            }),
          {}
        ),
      });

    case actionTypes.dynamicFeesRetrieved:
      return merge(state, { dynamicFees: action.dynamicFees });

    default:
      return state;
  }
};

export default service;
