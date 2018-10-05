import actionTypes from '../constants/actions';
import txConstants from '../constants/transactions';
import { getTransactions, send } from '../utilities/api/transactions';
import { loadingStarted, loadingFinished } from './loading';

export const transactionsLoaded = data =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    dispatch(loadingStarted(actionTypes.transactionsLoaded));
    getTransactions(activePeer, data)
      .then((response) => {
        dispatch({
          type: actionTypes.transactionsLoaded,
          data: {
            transactions: response.data,
          },
        });
        dispatch(loadingFinished(actionTypes.transactionsLoaded));
      });
  };

export const transactionAdded = (data, success, error) =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    const account = getState().accounts.active;
    dispatch(loadingStarted(actionTypes.transactionAdded));
    send(activePeer, data)
      .then(({ id }) => {
        dispatch({
          data: {
            id,
            senderPublicKey: account.publicKey,
            senderId: account.address,
            recipientId: data.recipientId,
            amount: data.amount,
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
