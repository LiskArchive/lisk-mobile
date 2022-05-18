import { renderHook } from '@testing-library/react-hooks';
import {
  account as accountAPI,
  transactions as transactionsAPI,
} from 'utilities/api';
import { tokenMap } from 'constants/tokens';
import data from 'constants/mockStore';
import useTransactionList from './index';

describe('useTransactionFeeCalculation', () => {
  beforeAll(() => {
    accountAPI.getSummary = jest.fn();
    transactionsAPI.get = jest.fn();
  });

  it('should ressolve account and transaction details', async () => {
    accountAPI.getSummary.mockResolvedValueOnce(data.account);
    transactionsAPI.get.mockResolvedValueOnce(data.transactions);
    const { result, waitForValueToChange } = renderHook(() =>
      useTransactionList({ address: data.account.address, activeToken: tokenMap.LSK.key }));

    await waitForValueToChange(() => result.current.account);
    expect(result.current.account).toEqual(data.account);
    expect(result.current.transactions).toEqual({
      confirmed: data.transactions.data,
      pending: [],
      loaded: true,
      count: data.transactions.meta.count
    });
    expect(result.current.transactions.confirmed).toHaveLength(3);
  });

  it('should load more data when loadMore function is called', async () => {
    accountAPI.getSummary.mockResolvedValue(data.account);
    transactionsAPI.get.mockResolvedValue(data.transactions);
    const { result, waitForValueToChange } = renderHook(() =>
      useTransactionList({ address: data.account.address, activeToken: tokenMap.LSK.key }));
    await waitForValueToChange(() => result.current.account);
    result.current.loadMore();
    await waitForValueToChange(() => result.current.transactions);
    expect(transactionsAPI.get).toHaveBeenCalled();
    expect(result.current.transactions.confirmed).toHaveLength(6);
  });
});
