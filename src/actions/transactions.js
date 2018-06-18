import actionTypes from '../constants/actions';
import txConstants from '../constants/transactions';
import { send } from '../utilities/http';
import { getTransactions } from '../utilities/api/account';
import { toRawLsk } from '../utilities/conversions';

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
  (dispatch) => {
    send(data)
      .then((res) => {
        dispatch({
          data: {
            id: res.transactionId,
            senderPublicKey: account.publicKey,
            senderId: account.address,
            recipientId: data.recipientId,
            amount: toRawLsk(data.amount),
            fee: txConstants.send.fee,
            type: txConstants.send.type,
          },
          type: actionTypes.transactionAdded,
        });
      });
  };
