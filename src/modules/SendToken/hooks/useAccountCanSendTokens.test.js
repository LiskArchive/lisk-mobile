import { renderHook } from '@testing-library/react-hooks';

import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';
import { mockSavedAccounts } from 'modules/Accounts/__fixtures__';

import { useAccountCanSendTokens } from './useAccountCanSendTokens';

jest.mock('modules/Accounts/api/useAccountTokensQuery');

describe('useAccountCanSendTokens', () => {
  beforeEach(() => {
    useAccountTokensQuery.mockClear();
  });

  const mockedAddress = mockSavedAccounts[0].metadata.address;

  it('should return loading state when account tokens query is loading', () => {
    useAccountTokensQuery.mockReturnValue({
      isLoading: true,
      data: null,
      isError: false,
    });
    const { result } = renderHook(() => useAccountCanSendTokens(mockedAddress));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(false);
  });

  it('should return error state when account tokens query returns an error', () => {
    useAccountTokensQuery.mockReturnValue({
      isLoading: false,
      data: null,
      isError: true,
    });
    const { result } = renderHook(() => useAccountCanSendTokens(mockedAddress));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
  });

  it('should return false when account tokens query returns empty data array', () => {
    useAccountTokensQuery.mockReturnValue({
      isLoading: false,
      data: { data: [] },
      isError: false,
    });
    const { result } = renderHook(() => useAccountCanSendTokens(mockedAddress));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return false when all account tokens have no available balance', () => {
    useAccountTokensQuery.mockReturnValue({
      isLoading: false,
      data: { data: [{ availableBalance: 0 }] },
      isError: false,
    });
    const { result } = renderHook(() => useAccountCanSendTokens(mockedAddress));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return true when at least one account token has available balance', () => {
    useAccountTokensQuery.mockReturnValue({
      isLoading: false,
      data: { data: [{ availableBalance: 0 }, { availableBalance: 100 }] },
      isError: false,
    });
    const { result } = renderHook(() => useAccountCanSendTokens(mockedAddress));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(true);
    expect(result.current.isError).toBe(false);
  });
});
