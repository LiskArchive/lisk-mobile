import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  accountFollowed,
  accountUnFollowed,
  accountEdited,
  accountSignedIn,
  accountFetched,
  blockUpdated,
  accountSignedOut,
  accountsStored,
  followedAccountsRetrieved,
} from './accounts';
import actionTypes from '../constants/actions';
import * as storageUtility from '../utilities/storage';
import {
  account as accountAPI,
  transactions as transactionsAPI,
} from '../utilities/api';
import { INITIAL_STATE as accounts } from '../store/reducers/accounts';
import { INITIAL_STATE as settings } from '../store/reducers/settings';
import { tokenMap } from '../constants/tokens';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = {
  activeToken: tokenMap.LSK.key,
  address: '7056261880661230236L',
  passphrase:
    'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together',
  account: {
    address: '5092448154042807473L',
    balance: '10000',
    publicKey:
      'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
    unconfirmedBalance: '10000',
    initialized: true,
  },
  transactions: {
    data: [
      {
        id: '13746538517771550559',
        height: 6174907,
        blockId: '10687269197653491500',
        type: 0,
        timestamp: 72473846,
        senderPublicKey:
          'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
        senderId: '7056261880661230236L',
        recipientId: '4913610097661759129L',
        recipientPublicKey:
          'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
        amount: '10000000000',
        fee: '10000000',
        signature:
          '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
        signatures: [],
        confirmations: 15227,
        asset: {
          data: 'manu',
        },
      },
      {
        id: '1374653851777155012559',
        height: 6174907,
        blockId: '10687269197653491500',
        type: 0,
        timestamp: 72473846,
        senderPublicKey:
          'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
        senderId: '7056261880661230236L',
        recipientId: '4913610097661759129L',
        recipientPublicKey:
          'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
        amount: '10000000000',
        fee: '10000000',
        signature:
          '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
        signatures: [],
        confirmations: 15227,
        asset: {
          data: 'manu',
        },
      },
      {
        id: '137465385177715502559',
        height: 6174907,
        blockId: '10687269197653491500',
        type: 0,
        timestamp: 72473846,
        senderPublicKey:
          'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
        senderId: '7056261880661230236L',
        recipientId: '4913610097661759129L',
        recipientPublicKey:
          'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
        amount: '10000000000',
        fee: '10000000',
        signature:
          '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
        signatures: [],
        confirmations: 15227,
        asset: {
          data: 'manu',
        },
      },
    ],
    meta: {
      count: 3,
    },
  },
};

describe('Action: Accounts', () => {
  beforeEach(() => {
    accountAPI.getSummary = jest.fn();
    transactionsAPI.get = jest.fn();
    storageUtility.storeAccounts = jest.fn();
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

  it('should dispatch accountsStored action when the data is written in the storage', async () => {
    const store = mockStore({});
    const expectedActions = [{ type: actionTypes.accountsStored }];
    storageUtility.storeAccounts.mockResolvedValue({});
    await store.dispatch(accountsStored({ address: data.address }));
    expect(store.getActions()).toEqual(expectedActions);
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
