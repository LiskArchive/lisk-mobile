import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actionTypes from 'constants/actions';
import * as storageUtility from 'utilities/storage';
import {
  account as accountAPI,
  transactions as transactionsAPI,
} from 'utilities/api';
import data from 'constants/mockStore';
import { INITIAL_STATE as accounts } from '../../../store/reducers/accounts';
import { INITIAL_STATE as settings } from '../../../store/reducers/settings';
import {
  accountFollowed,
  accountUnFollowed,
  accountEdited,
  accountSignedIn,
  accountFetched,
  blockUpdated,
  accountSignedOut,
  followedAccountsRetrieved,
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action: Accounts', () => {
  beforeEach(() => {
    accountAPI.getSummary = jest.fn();
    transactionsAPI.get = jest.fn();
    storageUtility.retrieveAccounts = jest.fn();
  });

  it('should return an accountUnFollowed action object', () => {
    const store = mockStore({ accounts, settings });
    const expectedValue = {
      type: actionTypes.accountUnFollowed,
      data: {
        address: data.address,
        activeToken: data.activeToken,
      },
    };
    store.dispatch(accountUnFollowed(data.address));
    expect(store.getActions()[0]).toEqual(expectedValue);
  });

  it('should return an accountSignedOut action object', () => {
    const expectedValue = {
      type: actionTypes.accountSignedOut,
    };
    expect(accountSignedOut()).toEqual(expectedValue);
  });

  it('should return an accountFollowed action object', () => {
    const store = mockStore({ accounts, settings });
    const label = 'test';
    const expectedValue = {
      type: actionTypes.accountFollowed,
      data: {
        account: { address: data.address, label },
        activeToken: data.activeToken,
      },
    };
    store.dispatch(accountFollowed(data.address, label));
    expect(store.getActions()[0]).toEqual(expectedValue);
  });

  describe('blockUpdated action', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        accounts,
        transactions: { confirmed: [] },
        settings,
      });
    });

    it('should update user and transactions', async () => {
      const expectedActions = [
        {
          type: actionTypes.transactionsUpdated,
          data: {
            confirmed: data.transactions.data,
            count: data.transactions.meta.count,
          },
        },
        {
          type: actionTypes.accountUpdated,
          data: {
            account: data.account,
            activeToken: data.activeToken,
          },
        },
      ];

      accountAPI.getSummary.mockResolvedValueOnce(data.account);
      transactionsAPI.get.mockResolvedValueOnce(data.transactions);

      await store.dispatch(blockUpdated());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should update user and transactions when store is not empty', async () => {
      store = mockStore({
        accounts,
        transactions: {
          confirmed: [
            {
              timestamp: 0,
            },
          ],
        },
        settings,
      });

      const expectedActions = [
        {
          type: actionTypes.transactionsUpdated,
          data: {
            confirmed: data.transactions.data,
            count: data.transactions.meta.count,
          },
        },
        {
          type: actionTypes.accountUpdated,
          data: {
            account: data.account,
            activeToken: data.activeToken,
          },
        },
      ];

      accountAPI.getSummary.mockResolvedValueOnce(data.account);
      transactionsAPI.get.mockResolvedValueOnce(data.transactions);

      await store.dispatch(blockUpdated());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should not update if there is no new transaction', async () => {
      transactionsAPI.get.mockResolvedValueOnce({ data: [] });
      await store.dispatch(blockUpdated());
      expect(store.getActions()).toEqual([]);
    });

    it('should handle rejections', async () => {
      transactionsAPI.get.mockRejectedValueOnce('Error!');
      await store.dispatch(blockUpdated());
      expect(store.getActions()).toEqual([]);
    });
  });

  it('should dispatch followedAccountsRetrieved action when the data is read from the storage', async () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: actionTypes.followedAccountsRetrieved,
        data: { BTC: [], LSK: [data.account] },
      },
    ];
    storageUtility.retrieveAccounts.mockResolvedValue([data.account]);
    await store.dispatch(followedAccountsRetrieved());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch accountSignedIn with passphrase and accounts addresses', async () => {
    const store = mockStore({ accounts, settings });
    const expectedActions = [
      {
        type: actionTypes.accountSignedIn,
        data: {
          passphrase: data.passphrase,
          info: {
            LSK: { address: data.account.address },
            BTC: { address: '1PA2gjCNsjsNEMSfAk6QhY8SEEs1GsPRk6' },
          },
        },
      },
      {
        type: actionTypes.followedAccountsRetrieved,
        data: { BTC: [], LSK: [data.account] },
      },
    ];
    storageUtility.retrieveAccounts.mockResolvedValue([data.account]);
    await store.dispatch(accountSignedIn({ passphrase: data.passphrase }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle error flow on accountFetched action', async () => {
    const store = mockStore({
      settings,
      accounts,
    });
    const expectedActions = [
      { type: actionTypes.loadingStarted, data: actionTypes.accountFetched },
      { type: actionTypes.loadingFinished, data: actionTypes.accountFetched },
    ];
    accountAPI.getSummary.mockRejectedValueOnce({ error: true });
    await store.dispatch(accountFetched());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should update the account info by accountFetched action', async () => {
    const store = mockStore({
      settings,
      accounts,
    });
    const expectedActions = [
      { type: actionTypes.loadingStarted, data: actionTypes.accountFetched },
      {
        type: actionTypes.accountUpdated,
        data: {
          account: data.account,
          activeToken: data.activeToken,
        },
      },
      { type: actionTypes.loadingFinished, data: actionTypes.accountFetched },
    ];
    accountAPI.getSummary.mockResolvedValueOnce(data.account);
    await store.dispatch(accountFetched());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should returns an accountEdited action object', () => {
    const store = mockStore({
      settings,
      accounts,
    });
    const label = 'test2';
    const expectedValue = [
      {
        type: actionTypes.accountEdited,
        data: {
          activeToken: data.activeToken,
          account: {
            address: data.address,
            label,
          },
        },
      },
    ];
    store.dispatch(accountEdited(data.address, label));
    expect(store.getActions()).toEqual(expectedValue);
  });
});
