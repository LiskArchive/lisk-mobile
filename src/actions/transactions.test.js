import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import txConstants from '../constants/transactions';
import actionTypes from '../constants/actions';
import { transactionsLoaded, transactionAdded, transactionsReset } from './transactions';
import { transactions as transactionsAPI } from '../utilities/api';
import { INITIAL_STATE as settings } from '../store/reducers/settings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
  ],
  meta: {
    count: 2,
  },
};

describe('Action: Accounts', () => {
  beforeAll(() => {
    transactionsAPI.get = jest.fn();
    transactionsAPI.create = jest.fn();
    transactionsAPI.broadcast = jest.fn();
  });

  describe('transactionsLoaded', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        accounts: { active: account },
        transactions: { confirmed: [] },
        settings,
      });
    });

    it('should load more transactions', async () => {
      const expectedActions = [
        {
          type: actionTypes.loadingStarted,
          data: actionTypes.transactionsLoaded,
        },
        {
          type: actionTypes.transactionsLoaded,
          data: {
            transactions: transactions.data,
            count: transactions.meta.count,
          },
        },
        {
          type: actionTypes.loadingFinished,
          data: actionTypes.transactionsLoaded,
        },
      ];

      transactionsAPI.get.mockResolvedValueOnce(transactions);
      await store.dispatch(transactionsLoaded({ offset: 0 }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should handle rejections', async () => {
      const expectedActions = [
        {
          type: actionTypes.loadingStarted,
          data: actionTypes.transactionsLoaded,
        },
        {
          type: actionTypes.loadingFinished,
          data: actionTypes.transactionsLoaded,
        },
      ];

      transactionsAPI.get.mockRejectedValueOnce('Error!');
      await store.dispatch(transactionsLoaded({ offset: 0 }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('transactionsAdded', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        accounts: {
          info: {
            LSK: account,
            BTC: {},
          },
        },
        transactions: { confirmed: [], pending: [] },
        settings,
      });
    });

    const inputData = {
      amount: 1000,
      recipientAddress: 'recipientAddress',
      reference: 'test ref',
      fee: txConstants.send.fee,
    };

    it('should call pendingTransactionAdded when send request is successful', async () => {
      const successCallback = jest.fn();

      const expectedActions = [
        {
          type: actionTypes.pendingTransactionAdded,
          data: {
            id: transactions.data[0].id,
            senderAddress: account.address,
            recipientAddress: inputData.recipientAddress,
            fee: inputData.fee,
            amount: inputData.amount,
            data: inputData.reference,
            type: txConstants.send.type,
          },
        },
      ];

      transactionsAPI.create.mockResolvedValueOnce('');
      transactionsAPI.broadcast.mockResolvedValueOnce(transactions.data[0]);

      await store.dispatch(transactionAdded(inputData, successCallback));

      expect(store.getActions()).toEqual(expectedActions);
      expect(successCallback.mock.calls).toHaveLength(1);
    });

    it('should go to error flow', async () => {
      const successCallback = jest.fn();
      const errorCallback = jest.fn();

      transactionsAPI.create.mockResolvedValueOnce('');
      transactionsAPI.broadcast.mockRejectedValueOnce('Error');

      await store.dispatch(transactionAdded(inputData, successCallback, errorCallback));

      expect(errorCallback.mock.calls).toHaveLength(1);
    });
  });

  describe('transactionsReset', () => {
    it('should dispatch a pure action object', () => {
      const store = mockStore({});
      const expectedActions = [
        { type: actionTypes.transactionsReset },
      ];
      store.dispatch(transactionsReset());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
