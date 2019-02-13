import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  accountFollowed,
  accountUnFollowed,
  accountEdited,
  accountSignedIn,
  blockUpdated,
  accountSignedOut,
  accountsStored,
  accountsRetrieved,
} from './accounts';
import actionTypes from '../constants/actions';
import * as storageUtility from '../utilities/storage';
import { account as accountAPI } from '../utilities/api';
import * as transactionsUtility from '../utilities/api/lisk/transactions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action: Accounts', () => {
  const account = {
    address: '5092448154042807473L',
    balance: '10000',
    publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
    unconfirmedBalance: '10000',
    initialized: true,
  };
  const transactions = {
    data: [
      {
        id: '13746538517771550559',
        height: 6174907,
        blockId: '10687269197653491500',
        type: 0,
        timestamp: 72473846,
        senderPublicKey: 'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
        senderId: '7056261880661230236L',
        recipientId: '4913610097661759129L',
        recipientPublicKey: 'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
        amount: '10000000000',
        fee: '10000000',
        signature: '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
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
        senderPublicKey: 'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
        senderId: '7056261880661230236L',
        recipientId: '4913610097661759129L',
        recipientPublicKey: 'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
        amount: '10000000000',
        fee: '10000000',
        signature: '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
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
        senderPublicKey: 'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
        senderId: '7056261880661230236L',
        recipientId: '4913610097661759129L',
        recipientPublicKey: 'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
        amount: '10000000000',
        fee: '10000000',
        signature: '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
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
  };
  const address = '7056261880661230236L';

  beforeEach(() => {
    accountAPI.getSummary = jest.fn();
    transactionsUtility.getTransactions = jest.fn();
  });

  it('should returns an accountUnFollowed action object', () => {
    const expectedValue = {
      type: actionTypes.accountUnFollowed,
      data: address,
    };
    expect(accountUnFollowed(address)).toEqual(expectedValue);
  });

  it('should returns an accountSignedOut action object', () => {
    const expectedValue = {
      type: actionTypes.accountSignedOut,
    };
    expect(accountSignedOut()).toEqual(expectedValue);
  });

  it('should returns an accountFollowed action object', () => {
    const label = 'test';
    const expectedValue = {
      type: actionTypes.accountFollowed,
      data: {
        address,
        label,
      },
    };
    expect(accountFollowed(address, label)).toEqual(expectedValue);
  });

  it('should update user data when block is updated', async () => {
    const store = mockStore({
      accounts: { active: account },
      transactions: { confirmed: [] },
    });
    const expectedActions = [
      {
        type: actionTypes.transactionsUpdated,
        data: { confirmed: transactions.data, count: transactions.meta.count },
      },
      {
        type: actionTypes.accountUpdated,
        data: account,
      },
    ];
    accountAPI.getSummary.mockResolvedValue(account);
    transactionsUtility.getTransactions.mockResolvedValue(transactions);
    await store.dispatch(blockUpdated());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch accountsStored action when the data is written in the storage', async () => {
    storageUtility.storeAccounts = jest.fn();
    const store = mockStore({});
    const expectedActions = [
      { type: actionTypes.accountsStored },
    ];
    storageUtility.storeAccounts.mockResolvedValue({});
    await store.dispatch(accountsStored({ address }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch accountsRetrieved action when the data is read from the storage', async () => {
    storageUtility.retrieveAccounts = jest.fn();
    const store = mockStore({});
    const expectedActions = [
      { type: actionTypes.accountsRetrieved, data: [account] },
    ];
    storageUtility.retrieveAccounts.mockResolvedValue([account]);
    await store.dispatch(accountsRetrieved());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch accountSignedIn action when it receives data of user', async () => {
    storageUtility.retrieveAccounts = jest.fn();
    const store = mockStore({});
    const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';
    const expectedActions = [
      { type: actionTypes.loadingStarted, data: actionTypes.accountSignedIn },
      { type: actionTypes.accountSignedIn, data: { ...account, passphrase } },
      { type: actionTypes.loadingFinished, data: actionTypes.accountSignedIn },
      { type: actionTypes.accountsRetrieved, data: [account] },
    ];
    accountAPI.getSummary.mockResolvedValue(account);
    storageUtility.retrieveAccounts.mockResolvedValue([account]);
    await store.dispatch(accountSignedIn({ passphrase }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle error flow on accountSignedIn action', async () => {
    storageUtility.retrieveAccounts = jest.fn();
    const store = mockStore({});
    const cb = jest.fn();
    const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';
    const expectedActions = [
      { type: actionTypes.loadingStarted, data: actionTypes.accountSignedIn },
      { type: actionTypes.loadingFinished, data: actionTypes.accountSignedIn },
    ];
    accountAPI.getSummary.mockRejectedValue({ error: true });
    await store.dispatch(accountSignedIn({ passphrase }, cb));
    expect(store.getActions()).toEqual(expectedActions);
    expect(cb).toBeCalled();
  });

  it('should returns an accountEdited action object', () => {
    const updatedData = 'test2';
    const expectedValue = {
      type: actionTypes.accountEdited,
      data: {
        address,
        label: updatedData,
      },
    };
    expect(accountEdited(address, updatedData)).toEqual(expectedValue);
  });
});
