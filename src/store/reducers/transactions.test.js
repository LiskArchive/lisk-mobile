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

  it('should add new transactions to confirmed list in case of actionTypes.transactionsLoaded', () => {
    const state = { pending: [], confirmed: [transaction1], count: 2 };
    const action = {
      type: actionTypes.transactionsLoaded,
      data: { transactions: [transaction2], count: 2 },
    };
    const changedState = transactions(state, action);
    expect(changedState.confirmed).toEqual([transaction1, transaction2]);
  });

  it('should unshift new transactions to pending list in case of actionTypes.transactionAdded', () => {
    const state = { pending: [], confirmed: [], count: null };
    const action = { type: actionTypes.transactionAdded, data: transaction1 };
    const changedState = transactions(state, action);
    expect(changedState.pending).toEqual([transaction1]);
  });
});
