import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useTransactionPoolQuery } from 'modules/Transactions/api/useTransactionPoolQuery';
import { mockSavedAccounts } from '../__fixtures__';
import { useAccountNonce } from './useAccountNonce';

jest.mock('modules/Auth/api/useAuthQuery');
jest.mock('modules/Transactions/api/useTransactionPoolQuery');

describe('useAccountNonce', () => {
  const address = mockSavedAccounts[0].metadata.address;
  const onChainNonce = 42;
  const poolMaxNonce = 43;

  const mockAuthQueryResult = {
    data: { data: { nonce: onChainNonce.toString() } },
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
    refetch: jest.fn(),
  };

  const mockTransactionPoolQueryResult = {
    data: { data: [{ nonce: poolMaxNonce.toString() }] },
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
    refetch: jest.fn(),
  };

  beforeEach(() => {
    useAuthQuery.mockReturnValue(mockAuthQueryResult);
    useTransactionPoolQuery.mockReturnValue(mockTransactionPoolQueryResult);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should compute the nonce from on-chain and pool data', () => {
    const { result } = renderHook(() => useAccountNonce(address));

    expect(result.current.data).toBe(poolMaxNonce.toString());
  });

  it('should fallback to on-chain nonce if pool data is empty', () => {
    useTransactionPoolQuery.mockReturnValueOnce({
      ...mockTransactionPoolQueryResult,
      data: { data: [] },
    });

    const { result } = renderHook(() => useAccountNonce(address));

    expect(result.current.data).toBe(onChainNonce.toString());
  });

  it('should return null if both on-chain and pool data are empty', () => {
    useAuthQuery.mockReturnValueOnce({
      ...mockAuthQueryResult,
      data: null,
    });

    useTransactionPoolQuery.mockReturnValueOnce({
      ...mockTransactionPoolQueryResult,
      data: { data: [] },
    });

    const { result } = renderHook(() => useAccountNonce(address));

    expect(result.current.data).toBeNull();
  });

  it('should return loading state while fetching data', () => {
    useAuthQuery.mockReturnValueOnce({
      ...mockAuthQueryResult,
      isLoading: true,
    });

    const { result } = renderHook(() => useAccountNonce(address));

    expect(result.current.isLoading).toBe(true);
  });

  it('should return error state if one of the queries has an error', () => {
    useAuthQuery.mockReturnValueOnce({
      ...mockAuthQueryResult,
      isError: true,
      error: new Error('Auth query error'),
    });

    const { result } = renderHook(() => useAccountNonce(address));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
  });

  it('should return the correct new data on refetch', async () => {
    const newData = '44';

    mockAuthQueryResult.refetch.mockResolvedValueOnce({
      ...mockAuthQueryResult,
      data: { data: { nonce: '3' } },
    });

    mockTransactionPoolQueryResult.refetch.mockResolvedValueOnce({
      ...mockTransactionPoolQueryResult,
      data: { data: [{ nonce: newData }] },
    });

    const { result } = renderHook(() => useAccountNonce(address));

    await act(async () => {
      const updatedData = await result.current.refetch();

      expect(updatedData).toEqual(newData);
    });
  });
});
