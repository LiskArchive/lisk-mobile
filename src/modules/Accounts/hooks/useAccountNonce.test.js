import { renderHook } from '@testing-library/react-hooks';

import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useAccountPoolTransactionsQuery } from '../api/useAccountPoolTransactionsQuery';
import { useAccountNonce } from './useAccountNonce';

jest.mock('modules/Auth/api/useAuthQuery');
jest.mock('../api/useAccountPoolTransactionsQuery');

describe('useAccountNonce', () => {
  const mockAuthQueryResult = {
    data: { data: { nonce: '1' } },
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
  };

  const mockPoolTransactionsQueryResult = {
    data: { data: [{ nonce: '2' }, { nonce: '3' }] },
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
  };

  it('returns the on-chain nonce if there are no transactions in the pool', async () => {
    useAuthQuery.mockReturnValueOnce(mockAuthQueryResult);
    useAccountPoolTransactionsQuery.mockReturnValueOnce({
      ...mockPoolTransactionsQueryResult,
      data: { data: [] },
    });

    const { result } = renderHook(() => useAccountNonce('0x1234567890abcdef', 'my-module-command'));

    expect(result.current).toEqual({
      data: 1,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });
  });

  it('returns the maximum nonce in the pool if there are transactions in the pool', async () => {
    useAuthQuery.mockReturnValueOnce(mockAuthQueryResult);
    useAccountPoolTransactionsQuery.mockReturnValueOnce(mockPoolTransactionsQueryResult);

    const { result } = renderHook(() => useAccountNonce('0x1234567890abcdef', 'my-module-command'));

    expect(result.current).toEqual({
      data: 3,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });
  });

  it('returns null if the on-chain nonce and transaction pool are both empty', async () => {
    useAuthQuery.mockReturnValueOnce({
      ...mockAuthQueryResult,
      data: null,
    });
    useAccountPoolTransactionsQuery.mockReturnValueOnce({
      ...mockPoolTransactionsQueryResult,
      data: { data: [] },
    });

    const { result } = renderHook(() => useAccountNonce('0x1234567890abcdef', 'my-module-command'));

    expect(result.current).toEqual({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });
  });

  it('returns an error object if either query encounters an error', async () => {
    const mockError = new Error('Something went wrong');

    useAuthQuery.mockReturnValueOnce({
      ...mockAuthQueryResult,
      data: null,
      isError: true,
      isSuccess: false,
      error: mockError,
    });
    useAccountPoolTransactionsQuery.mockReturnValueOnce({
      ...mockPoolTransactionsQueryResult,
      data: null,
      isError: true,
      isSuccess: false,
      error: mockError,
    });

    const { result } = renderHook(() => useAccountNonce('0x1234567890abcdef', 'my-module-command'));

    expect(result.current).toEqual({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: mockError,
    });
  });
});
