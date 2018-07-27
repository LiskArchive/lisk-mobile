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

export const transactionAdded = (data, account, cb) =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    dispatch(loadingStarted(actionTypes.transactionAdded));
    send(activePeer, data)
      .then((res) => {
        dispatch({
          data: {
            id: res.id,
            senderPublicKey: account.publicKey,
            senderId: account.address,
            recipientId: data.recipientId,
            amount: data.amount,
            fee: txConstants.send.fee,
            type: txConstants.send.type,
          },
          type: actionTypes.transactionAdded,
        });
        dispatch(loadingFinished(actionTypes.transactionAdded));
        cb({ txId: res.id });
      });
  };
