import actionTypes from '../constants/actions';
import txConstants from '../constants/transactions';
import { getTransactions, send } from '../utilities/api/lisk/transactions';
import { loadingStarted, loadingFinished } from './loading';

export const transactionsLoaded = data => (dispatch) => {
  dispatch(loadingStarted(actionTypes.transactionsLoaded));
  getTransactions(data)
    .then((response) => {
      dispatch({
        type: actionTypes.transactionsLoaded,
        data: {
          transactions: response.data,
          count: response.meta.count,
        },
      });
      dispatch(loadingFinished(actionTypes.transactionsLoaded));
    });
};

export const transactionAdded = (data, success, error) => (dispatch, getState) => {
  const { accounts, settings: { token } } = getState();
  const account = accounts.info[token.active];
  dispatch(loadingStarted(actionTypes.transactionAdded));
  send(data)
    .then(({ id }) => {
      dispatch({
        data: {
          id,
          senderPublicKey: account.publicKey,
          senderId: account.address,
          recipientId: data.recipientId,
          amount: data.amount,
          asset: {
            data: data.data,
          },
          fee: txConstants.send.fee,
          type: txConstants.send.type,
        },
        type: actionTypes.pendingTransactionAdded,
      });
      dispatch(loadingFinished(actionTypes.transactionAdded));
      success({ txId: id });
    }).catch((err) => {
      dispatch(loadingFinished(actionTypes.transactionAdded));
      error(err);
    });
};
