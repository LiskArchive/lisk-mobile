import Lisk from '@liskhq/lisk-client';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import txConstants from '../constants/transactions';
import {
  transactionsLoaded,
  transactionAdded,
} from './transactions';
import actionTypes from '../constants/actions';
import * as transactionsUtility from '../utilities/api/lisk/transactions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action: Accounts', () => {
  const activePeer = new Lisk.APIClient(
    Lisk.APIClient.constants.TESTNET_NODES,
    { nethash: Lisk.APIClient.constants.TESTNET_NETHASH },
  );
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
  transactionsUtility.send = jest.fn();
  transactionsUtility.getTransactions = jest.fn();

  describe('transactionsLoaded', () => {
    it('should load more transactions', async () => {
      const store = mockStore({
        peers: { activePeer },
        accounts: { active: account },
        transactions: { confirmed: [] },
      });
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
      transactionsUtility.getTransactions.mockResolvedValue(transactions);
      await store.dispatch(transactionsLoaded({ offset: 0 }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('transactionsAdded', () => {
    it('should call pendingTransactionAdded when send request is successful', async () => {
      const store = mockStore({
        peers: { activePeer },
        accounts: { active: account },
        transactions: { confirmed: [], pending: [] },
      });
      const cb = jest.fn();
      const inputData = {
        amount: 1000,
        recipientId: 'recipientId',
        data: 'test ref',
      };
      const expectedActions = [
        { type: actionTypes.loadingStarted, data: actionTypes.transactionsAdded },
        {
          type: actionTypes.pendingTransactionAdded,
          data: {
            id: transactions.data[0].id,
            senderPublicKey: account.publicKey,
            senderId: account.address,
            amount: inputData.amount,
            recipientId: inputData.recipientId,
            fee: txConstants.send.fee,
            asset: {
              data: inputData.data,
            },
            type: txConstants.send.type,
          },
        },
        { type: actionTypes.loadingFinished, data: actionTypes.transactionsAdded },
      ];
      transactionsUtility.send.mockResolvedValue(transactions.data[0]);
      await store.dispatch(transactionAdded(inputData, cb));
      expect(store.getActions()).toEqual(expectedActions);
      expect(cb.mock.calls).toHaveLength(1);
    });
  });
});
