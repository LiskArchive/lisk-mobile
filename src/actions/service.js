import { service as serviceAPI } from 'utilities/api';
import actionTypes from 'constants/actions';

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
