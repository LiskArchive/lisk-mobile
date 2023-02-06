/* eslint-disable max-statements */
import { useInvokeQuery } from 'utilities/api/hooks/useInvokeQuery';

export function useInitializationFee({
  options = {},
  address,
  tokenID,
  isCrossChainTransaction = false,
} = {}) {
  const isAccountInitialisedQueryConfig = {
    data: {
      endpoint: 'token_hasUserAccount',
      params: { address, tokenID },
    },
  };

  const initializationFeesQueryConfig = {
    data: {
      endpoint: 'token_getInitializationFees',
      params: {},
    },
  };

  const {
    data: isAccountInitialisedQueryData,
    isLoading: isLoadingIsAccountInitialisedQuery,
    isErrorIsAccountInitialisedQuery,
    error: errorIsAccountInitialisedQuery,
    isSuccess: isSuccessIsAccountInitialisedQuery,
  } = useInvokeQuery({
    config: isAccountInitialisedQueryConfig,
  });

  const isAccountInitialised = isAccountInitialisedQueryData?.data.exists;

  const {
    data: initializationFeesQueryData,
    isLoading: isLoadingInitializationFeesQuery,
    isError: isErrorInitializationFeesQuery,
    error: errorErrorInitializationFeesQuery,
    isSuccess: isSuccessErrorInitializationFeesQuery,
  } = useInvokeQuery({
    config: initializationFeesQueryConfig,
    options: { ...options, enabled: !isAccountInitialised },
  });

  const data = isAccountInitialised
    ? 0
    : initializationFeesQueryData?.data[isCrossChainTransaction ? 'userAccount' : 'escrowAccount'];
  const isLoading = isLoadingIsAccountInitialisedQuery || isLoadingInitializationFeesQuery;
  const isError = isErrorIsAccountInitialisedQuery || isErrorInitializationFeesQuery;
  const error = errorIsAccountInitialisedQuery || errorErrorInitializationFeesQuery;
  const isSuccess = isSuccessIsAccountInitialisedQuery && isSuccessErrorInitializationFeesQuery;

  return { data, isLoading, isError, error, isSuccess };
}
