import transactions from './transactions';
import actionTypes from '../../constants/actions';

describe('Reducers: Transactions', () => {
  const transaction1 = {
    id: '123456789',
    senderId: '123456789L',
    amount: 100000000,
    fee: 10000000,
  };
  const transaction2 = {
    id: '123456788',
    senderId: '123456788L',
    amount: 200000000,
    fee: 10000000,
  };
  const emptyState = { pending: [], confirmed: [], count: null };

  it('should create the empty state initially', () => {
    const createdState = transactions();
    expect(createdState).toEqual(emptyState);
  });

  it('should add new transactions to confirmed list in case of actionTypes.transactionsLoaded', () => {
    const currentState = { pending: [], confirmed: [transaction1], count: 2 };
    const action = {
      type: actionTypes.transactionsLoaded,
      data: { transactions: [transaction2], count: 2 },
    };
    const changedState = transactions(currentState, action);
    expect(changedState.confirmed).toEqual([transaction1, transaction2]);
  });

  it('should unshift new transactions to pending list in case of actionTypes.transactionAdded', () => {
    const action = { type: actionTypes.pendingTransactionAdded, data: transaction1 };
    const changedState = transactions(emptyState, action);
    expect(changedState.pending).toEqual([transaction1]);
  });

  it('should remove pending transaction if already confirmed in case of actionTypes.transactionsUpdated', () => {
    const currentState = { pending: [transaction2], confirmed: [transaction1], count: 2 };
    const expectedState = { pending: [], confirmed: [transaction1, transaction2], count: 3 };
    const action = {
      type: actionTypes.transactionsUpdated,
      data: { confirmed: [transaction1, transaction2], count: 3 },
    };
    const changedState = transactions(currentState, action);
    expect(changedState).toEqual(expectedState);
  });

  it('should revert to empty state in case of actionTypes.accountSignedOut', () => {
    const state = { pending: [], confirmed: [transaction1, transaction2], count: 10 };
    const action = { type: actionTypes.accountSignedOut };
    const changedState = transactions(state, action);
    expect(changedState).toEqual(emptyState);
  });
});
