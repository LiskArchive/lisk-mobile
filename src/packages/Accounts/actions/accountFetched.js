import actionTypes from 'constants/actions';

import { account as accountAPI } from 'utilities/api';
import { loadingStarted, loadingFinished } from '../../../actions/loading';

export const accountFetched = (givenToken) => (dispatch, getState) => {
  const selectedToken = givenToken || getState().settings.token.active;
  const { address } = getState().accounts.info[selectedToken];

  dispatch(loadingStarted(actionTypes.accountFetched));
  return accountAPI
    .getSummary(selectedToken, { address })
    .then((account) => {
      accountAPI.getNetworkInfo(selectedToken).then(data => {
        if (data) {
          dispatch({
            type: actionTypes.networkInfoUpdated,
            data,
          });
        }
      });
      dispatch({
        type: actionTypes.accountUpdated,
        data: {
          account,
          activeToken: selectedToken
        }
      });
      dispatch(loadingFinished(actionTypes.accountFetched));
    })
    .catch(() => {
      dispatch(loadingFinished(actionTypes.accountFetched));
    });
};
