import actionTypes from '../constants/actions';
import { retrieveAccounts, storeAccounts } from '../utilities/storage';
import { getAccount, extractAddress } from '../utilities/api/account';
import { loadingStarted, loadingFinished } from './loading';
import { getTransactions } from '../utilities/api/transactions';

/**
 * Stores the given accounts data in AsyncStorage
 * No normalization or validation here.
 * Vividly, this action is not handled in Redux Reducers
 *
 * @todo Rejection must is not handled
 *
 * @param {Object} data - The accounts data to get stored in asyncStorage
 * @returns {Function} Thunk action function
 */
export const accountsStored = data =>
  (dispatch) => {
    storeAccounts(data)
      .then(() => {
        dispatch({
          type: actionTypes.accountsStored,
        });
      });
  };

/**
 * Retrieves the stored accounts and then
 * dispatches an action to store the accounts
 * in Redux store
 *
 * The retrieved data has been normalized and validated
 * in Storage utility, thus no need for such logics here.
 *
 * Rejection must is handled in Storage utility and returns Raw account interface
 *
 * @returns {Function} Thunk action function
 */
export const accountsRetrieved = () =>
  (dispatch) => {
    retrieveAccounts()
      .then((accounts) => {
        dispatch({
          type: actionTypes.accountsRetrieved,
          data: accounts,
        });
      });
  };

/**
 * Returns a pure action object to store the given account
 * in the list of followed accounts
 *
 * @param {String} address - Valid Lisk ID
 * @param {String} label - A custom string of length 3-16
 *
 * @returns {Object} - Pure action function
 */
export const accountFollowed = (address, label) => ({
  type: actionTypes.accountFollowed,
  data: {
    address,
    label,
  },
});

/**
 * Returns a pure action object to remove the given account
 * from the list of followed accounts
 *
 * @param {String} account.address - Valid Lisk ID
 *
 * @returns {Object} - Pure action function
 */
export const accountUnFollowed = address => ({
  type: actionTypes.accountUnFollowed,
  data: address,
});

/**
 * Returns a pure action object to edit/update the values of
 * a followed account
 *
 * @param {String} address - Valid Lisk ID
 * @param {Object} updatedData
 * @param {String} updatedData.address - Valid Lisk ID
 * @param {String} updatedData.label - A string title/label of length 3-18 chars
 *
 * @returns {Object} - Pure action function
 */
export const accountEdited = (address, updatedData) => ({
  type: actionTypes.accountEdited,
  data: { address, updatedData },
});

/**
 * Uses Http call to fetch Account and delegate info of a given
 * passphrase and dispatches accountLoggedIn action
 *
 * @todo Implement delegate Api call
 *
 * @param {Object} data
 * @param {String} data.passphrase - The valid passphrase to login using
 * @returns {Function} Thunk function
 */
export const accountLoggedIn = ({ passphrase }) =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    dispatch(loadingStarted(actionTypes.accountLoggedIn));
    getAccount(activePeer, extractAddress(passphrase))
      .then((account) => {
        dispatch({
          type: actionTypes.accountLoggedIn,
          data: { ...account, passphrase },
        });
        dispatch(loadingFinished(actionTypes.accountLoggedIn));
      });
  };
/**
 * Returns action object with no Api calls.
 *
 * @returns {Object} Action object including action type
 */
export const accountLoggedOut = () =>
  ({
    type: actionTypes.accountLoggedOut,
  });

// export const blockUpdated = ({ transactions }) => (dispatch, getState) => {
//   if (transactions) {
//     const accountAddress = getState().accounts.active.address;
//     const blockContainsRelevantTransaction = transactions.filter((transaction) => {
//       const sender = transaction ? transaction.senderId : null;
//       const recipient = transaction ? transaction.recipientId : null;
//       return accountAddress === recipient || accountAddress === sender;
//     }).length > 0;
//     if (blockContainsRelevantTransaction) {
//       setTimeout(() => {
//         const { activePeer } = getState().peers;
//         getAccount(activePeer, accountAddress)
//           .then((account) => {
//             dispatch({
//               type: actionTypes.accountUpdated,
//               data: account,
//             });
//           });
//         dispatch({
//           type: actionTypes.transactionsUpdated,
//           data: { confirmed: transactions },
//         });
//       }, 5000);
//     }
//   }
// };

export const blockUpdated = () => (dispatch, getState) => {
  console.log('info -- updated');
  const { address } = getState().accounts.active;
  const { activePeer } = getState().peers;
  const { confirmed } = getState().transactions;
  const lastTx = confirmed.length > 0 ? confirmed[0] : [];
  getTransactions(activePeer, {
    senderIdOrRecipientId: address,
    offset: 0,
  }).then((response) => {
    const newTransactions = response.data.filter(tx => tx.timestamp > lastTx.timestamp);
    if (newTransactions.length) {
      dispatch({
        type: actionTypes.transactionsUpdated,
        data: { confirmed: newTransactions },
      });

      getAccount(activePeer, address).then((account) => {
        dispatch({
          type: actionTypes.accountUpdated,
          data: account,
        });
      });
    }
  });
};
