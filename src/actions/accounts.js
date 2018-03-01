import actionTypes from "../constants/actions";
import { retrieveAccounts, storeAccounts } from '../utilities/storage';

export const accountsStored = () => ({
  type: actionTypes.accountsStored,
  data: { list: [], active: -1 },
});

export const accountsRetrieved = () =>
  (dispatch) => {
    retrieveAccounts()
      .then((accounts) => {
        dispatch(storeAccounts(accounts));
      });
  }
