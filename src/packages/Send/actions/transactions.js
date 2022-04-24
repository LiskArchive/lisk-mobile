import { moduleAssetNameIdMap } from 'constants/transactions';
import { transactions as transactionsAPI } from 'utilities/api';
import { tokenMap } from 'constants/tokens';
import { loadingStarted, loadingFinished } from 'actions/loading';
import actionTypes from '../actionTypes';

const fetchTransactions = async (dispatch, getState, data) => {
  dispatch(loadingStarted(actionTypes.transactionsLoaded));

  try {
    const response = await transactionsAPI.get(
      getState().settings.token.active,
      data
    );

    dispatch({
      type: actionTypes.transactionsLoaded,
      data: {
        transactions: response.data,
        count: response.meta.count,
      },
    });
    dispatch(loadingFinished(actionTypes.transactionsLoaded));
  } catch (error) {
    dispatch(loadingFinished(actionTypes.transactionsLoaded));
  }
};

export const transactionsReset = () => ({
  type: actionTypes.transactionsReset,
});

export const transactionsLoaded = data => async (dispatch, getState) => {
  fetchTransactions(dispatch, getState, data);
};

/**
 * Calls transactionAPI.create and transactionAPI.broadcast methods to make a transaction.
 * @param {Object} data
 * @param {String} data.recipientAddress
 * @param {Number} data.amount - In raw format (satoshis, beddows)
 * @param {Number} data.fee - In raw format, used for updating the TX List.
 * @param {Number} data.dynamicFeePerByte - In raw format, used for creating BTC transaction.
 * @param {Number} data.reference - Data field for LSK transactions
 * @param {String} data.secondPassphrase - Second passphrase for LSK transactions
 * @param {Function} successCb - success callback
 * @param {Function} errorCb - error callback
 */
// eslint-disable-next-line max-statements
export const transactionAdded = (data, successCb, errorCb) => async (
  dispatch,
  getState
) => {
  const {
    settings: { token },
    accounts,
  } = getState();
  const account = accounts.info[token.active];

  try {
    const tx = await transactionsAPI.create(token.active, { ...data, nonce: account.nonce });

    if (token.active === tokenMap.LSK.key) {
      const { id } = await transactionsAPI.broadcast(token.active, tx);

      dispatch({
        type: actionTypes.pendingTransactionAdded,
        data: {
          id,
          senderAddress: account.address,
          recipientAddress: data.recipientAddress,
          amount: data.amount,
          fee: data.fee,
          moduleAssetId: moduleAssetNameIdMap.transfer,
          data: data.reference,
        },
      });

      successCb({ txId: id, address: data.recipientAddress });
    } else {
      await transactionsAPI.broadcast(token.active, tx);

      dispatch(transactionsReset());
      dispatch(transactionsLoaded({ address: account.address }));

      successCb();
    }
  } catch (error) {
    errorCb(error);
  }
};
