/* eslint-disable max-statements */
import { useInvokeQuery } from 'utilities/api/hooks/useInvokeQuery';

/**
 * Calculates the initialization fee (or extra command fee) of a transaction
 * for a given account and token.
 * @param {string} params.address - Account address to verify existence (fee will be 0 if des not exist).
 * @param {string} params.tokenID - Token ID to verify the account address existence.
 * @param {boolean} params.isCrossChainTransaction - Flag that indicates if transaction is cross-chain or not (default: false).
 * @param {QueryOptions} params.options - Initialization fee query custom options.
 * @param {boolean} params.enabled - Flag that indicates if the hook queries are enabled or not. Default is true.
 * @returns {QueryResult<number>} Query state: data (initialization fee), isLoading, isError, error and more.
 */
export function useInitializationFee({
  address,
  tokenID,
  isCrossChainTransaction = false,
  options = {},
  enabled = true,
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
    },
  };

  const {
    data: isAccountInitialisedQueryData,
    isLoading: isLoadingIsAccountInitialisedQuery,
    isErrorIsAccountInitialisedQuery,
    error: errorIsAccountInitialisedQuery,
    isSuccess: isSuccessIsAccountInitialisedQuery,
    refetch: refetchAccountInitialisedQuery,
  } = useInvokeQuery({
    config: isAccountInitialisedQueryConfig,
    options: { enabled },
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
    options: { ...options, enabled: isAccountInitialised === false },
  });

  const refetch = () => refetchAccountInitialisedQuery();

  const data = isAccountInitialised
    ? 0
    : initializationFeesQueryData?.data[isCrossChainTransaction ? 'userAccount' : 'escrowAccount'];
  const isLoading = isLoadingIsAccountInitialisedQuery || isLoadingInitializationFeesQuery;
  const isError = isErrorIsAccountInitialisedQuery || isErrorInitializationFeesQuery;
  const error = errorIsAccountInitialisedQuery || errorErrorInitializationFeesQuery;
  const isSuccess = isSuccessIsAccountInitialisedQuery && isSuccessErrorInitializationFeesQuery;

  return { data, isLoading, isError, error, isSuccess, refetch };
}
