import actionTypes from '../constants/actions';
import txConstants from '../constants/transactions';
import { getTransactions, send } from '../utilities/http';
import { toRawLsk } from '../utilities/conversions';

export const transactionsLoaded = data =>
  (dispatch) => {
    getTransactions(data)
      .then(({ transactions, count }) => {
        dispatch({
          type: actionTypes.transactionsLoaded,
          data: {
            transactions,
            count,
          },
        });
      }).catch(error => console.log(error));
  };

export const transactionAdded = (data, account) =>
  (dispatch) => {
    send(data)
      .then((res, oth) => {
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
      })
      .catch(error => console.log(error));
  };
