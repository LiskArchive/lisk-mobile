import actionTypes from '../constants/actions';
import txConstants from '../constants/transactions';
import { transactions as transactionsAPI } from '../utilities/api';
import { loadingStarted, loadingFinished } from './loading';

export const transactionsLoaded = data => async (dispatch, getState) => {
  dispatch(loadingStarted(actionTypes.transactionsLoaded));

  try {
    const response = await transactionsAPI.get(getState().settings.token.active, data);

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

export const transactionAdded = (data, successCb, errorCb) => async (dispatch, getState) => {
  dispatch(loadingStarted(actionTypes.transactionAdded));

  const account = getState().accounts.active;
  const activeToken = getState().settings.token.active;

  try {
    const tx = await transactionsAPI.create(activeToken, data);
    const { id } = await transactionsAPI.broadcast(activeToken, tx);

    dispatch({
      type: actionTypes.pendingTransactionAdded,
      data: {
        id,
        senderAddress: account.address,
        recipientAddress: data.recipientAddress,
        amount: data.amount,
        fee: txConstants.send.fee,
        type: txConstants.send.type,
        data: data.data,
      },
    });

    dispatch(loadingFinished(actionTypes.transactionAdded));
    successCb({ txId: id });
  } catch (error) {
    dispatch(loadingFinished(actionTypes.transactionAdded));
    errorCb(error);
  }
};
