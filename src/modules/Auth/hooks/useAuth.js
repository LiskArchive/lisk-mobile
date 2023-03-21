import { useAccountNonce } from 'modules/Accounts/hooks/useAccountNonce';
import { useAuthQuery } from '../api/useAuthQuery';

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
