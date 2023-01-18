import { service as serviceAPI } from 'utilities/api';
import actionTypes from 'constants/actions';

/**
 * @TODO This implementation will be changed to use react-query and Lisk Service v3
 * (details on https://github.com/LiskHQ/lisk-mobile/issues/1595).
 */
export const pricesRetrieved = () => (dispatch, getState) => {
  const {
    settings: { token },
  } = getState();

  serviceAPI
    .getPriceTicker(token.active)
    .then((priceTicker) =>
      dispatch({
        type: actionTypes.pricesRetrieved,
        data: {
          priceTicker,
          activeToken: token.active,
        },
      })
    )
    .catch((err) => console.log(err));
};

export const dynamicFeesRetrieved = () => (dispatch, getState) => {
  const {
    settings: { token },
  } = getState();

  serviceAPI
    .getDynamicFees(token.active)
    .then((dynamicFees) =>
      dispatch({
        type: actionTypes.dynamicFeesRetrieved,
        dynamicFees,
      })
    )
    .catch((err) => console.log(err));
};
