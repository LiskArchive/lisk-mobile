import actionTypes from '../constants/actions';
import { getTransactions } from '../utilities/http';

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

export const transactionAdded = data => ({
  data,
  type: actionTypes.transactionAdded,
});

