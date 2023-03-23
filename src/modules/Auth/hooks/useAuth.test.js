import { renderHook } from '@testing-library/react-hooks';
import { useAccountNonce } from 'modules/Accounts/hooks/useAccountNonce';
import { mockSavedAccounts } from 'modules/Accounts/__fixtures__';
import { useAuthQuery } from '../api/useAuthQuery';
import { mockAuth } from '../__fixtures__';
import { useAuth } from './useAuth';

jest.mock('../api/useAuthQuery');
jest.mock('modules/Accounts/hooks/useAccountNonce');

describe('useAuth', () => {
  const address = mockSavedAccounts[0].metadata.address;

  const accountNonceData = 'mockedNonce';

  const mockAuthQueryResponse = {
    data: { data: mockAuth },
    isLoading: false,
    isError: false,
    isSuccess: true,
  };

  const mockAccountNonceResponse = {
    data: accountNonceData,
    isLoading: false,
    isError: false,
    isSuccess: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useAuthQuery.mockReturnValue(mockAuthQueryResponse);
    useAccountNonce.mockReturnValue(mockAccountNonceResponse);
  });

  it('should return the auth data and nonce if both queries are successful', async () => {
    const { result } = renderHook(() => useAuth(address));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockAuthQueryResponse.data.data,
      nonce: accountNonceData,
    });
  });

  it('should return undefined data if auth data is not defined', () => {
    useAuthQuery.mockReturnValue({ ...mockAuthQueryResponse, data: undefined });

    const { result } = renderHook(() => useAuth(address));

    expect(result.current.data).toBeUndefined();
  });

  it('should return undefined data if nonce data is not defined', () => {
    useAccountNonce.mockReturnValue({
      ...mockAccountNonceResponse,
      data: undefined,
    });

    const { result } = renderHook(() => useAuth(address));

    expect(result.current.data).toBeUndefined();
  });

  it('should return the correct loading state when auth query is loading', () => {
    useAuthQuery.mockReturnValue({ ...mockAuthQueryResponse, data: undefined, isLoading: true });

    const { result } = renderHook(() => useAuth(address));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should return the correct loading state when nonce query is loading', () => {
    useAccountNonce.mockReturnValue({
      ...mockAccountNonceResponse,
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useAuth(address));

    expect(result.current.isLoading).toBe(true);
  });

  it('should return error state when auth query throw an error', () => {
    useAuthQuery.mockReturnValue({ ...mockAuthQueryResponse, isError: true });

    const { result } = renderHook(() => useAuth(address));

    expect(result.current.isError).toBe(true);
  });

  it('should return error state when nonce query throw an error', () => {
    useAccountNonce.mockReturnValue({ ...mockAccountNonceResponse, isError: true });

    const { result } = renderHook(() => useAuth(address));

    expect(result.current.isError).toBe(true);
  });
});
