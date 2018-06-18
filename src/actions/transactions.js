import actionTypes from '../constants/actions';
import txConstants from '../constants/transactions';
import { getTransactions, send } from '../utilities/api/account';

export const transactionsLoaded = data =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    getTransactions(activePeer, data)
      .then((response) => {
        dispatch({
          type: actionTypes.transactionsLoaded,
          data: {
            transactions: response.data,
            count: response.count,
          },
        });
      });
  };

export const transactionAdded = (data, account) =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    send(activePeer, data)
      .then((res) => {
        dispatch({
          data: {
            id: res.transactionId,
            senderPublicKey: account.publicKey,
            senderId: account.address,
            recipientId: data.recipientId,
            amount: data.amount,
            fee: txConstants.send.fee,
            type: txConstants.send.type,
          },
          type: actionTypes.transactionAdded,
        });
      });
  };
