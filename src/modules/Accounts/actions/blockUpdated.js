import { account as accountAPI, transactions as transactionsAPI } from 'utilities/api';
import actionTypes from '../actionTypes';

// eslint-disable-next-line max-statements
export const blockUpdated = () => async (dispatch, getState) => {
  const activeToken = getState().settings.token.active;
  const { address } = getState().accounts.info[activeToken];
  const { confirmed } = getState().transactions;
  const lastTx = confirmed.length > 0 ? confirmed[0] : null;

  try {
    const response = await transactionsAPI.get(activeToken, {
      address,
      offset: 0
    });

    const newTransactions = lastTx
      ? response.data.filter((tx) => tx.confirmations === 0 || tx.timestamp > lastTx.timestamp)
      : response.data;

    if (newTransactions.length) {
      dispatch({
        type: actionTypes.transactionsUpdated,
        data: {
          confirmed: newTransactions,
          count: response.meta.count
        }
      });

      const account = await accountAPI.getSummary(activeToken, { address });

      dispatch({
        type: actionTypes.accountUpdated,
        data: {
          account,
          activeToken
        }
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
