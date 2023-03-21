import { useAccountNonce } from 'modules/Accounts/hooks/useAccountNonce';
import { useAuthQuery } from '../api/useAuthQuery';

/**
 * Retrieves the auth data of an account given its address. Computes the nonce considering the account's on-chain data and the pending transactions in mem pool.
 * @param {string} address - Account address to fetch the auth data from.
 * @returns {Pick<QueryResult, 'data' | 'isLoading' 'isError' | 'isSuccess'>} - The query state.
 */
export function useAuth(address) {
  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isErrorOnAuth,
    isSuccess: isAuthSuccess,
  } = useAuthQuery(address);

  const {
    data: accountNonceData,
    isLoading: isAccountNonceLoading,
    isError: isErrorOnAccountNonce,
    isSuccess: isAccountNonceSuccess,
  } = useAccountNonce(address);

  const isLoading = isAuthLoading || isAccountNonceLoading;
  const isError = isErrorOnAuth || isErrorOnAccountNonce;
  const isSuccess = isAuthSuccess && isAccountNonceSuccess;
  const data = authData?.data && accountNonceData && { ...authData.data, nonce: accountNonceData };

  return { data, isLoading, isError, isSuccess };
}
