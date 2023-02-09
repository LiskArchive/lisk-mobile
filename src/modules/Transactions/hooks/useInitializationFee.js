/* eslint-disable max-statements */
import { useInvokeQuery } from 'utilities/api/hooks/useInvokeQuery';

/**
 * Calculates the initialization fee (or extra command fee) of a transaction
 * for a given account and token.
 * @param {Object} params.options - Query custom options.
 * @param {String} params.address - Account address to verify existence (fee will be 0 if des not exist).
 * @param {String} params.tokenID - Token ID to verify the account address existence.
 * @param {Boolean} params.isCrossChainTransaction - Flag that indicates if transaction is cross-chain or not (default: false).
 * @returns {Object} Query state: data, isLoading, isError, error and isSuccess.
 */
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
