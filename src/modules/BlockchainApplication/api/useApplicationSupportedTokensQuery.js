/* eslint-disable max-statements */
import { useRef } from 'react';

import { APIClient } from 'utilities/api/APIClient';
import { useSupportedTokensQuery } from './useSupportedTokensQuery';
import { useTokensMetaQuery } from './useTokensMetaQuery';

/**
 * Fetch list of supported tokens for a given blockchain application.
 * Executes the API call once the hook is mounted.
 * @param {Object} application - Blockchain application to fetch the supported tokens from.
 * @returns - The query state of the API call. Includes the data
 * (supported tokens), loading state, error state, and more.
 */
export function useApplicationSupportedTokensQuery(application) {
  const apiClient = useRef(new APIClient());

  apiClient.current.create({
    ...application?.serviceURLs?.[0],
    enableCertPinning: application?.chainName === 'lisk_mainchain',
  });

  const {
    data: { data: tokensMetaData } = {},
    isLoading: isTokensMetaDataLoading,
    isError: isTokensMetaDataError,
    isSuccess: isSuccessTokensMetaData,
  } = useTokensMetaQuery({
    config: { params: { chainID: undefined, network: application?.networkType } },
    client: apiClient.current,
  });

  const {
    data: { data: { supportedTokens: supportedTokensData = {} } = {} } = {},
    isLoading: isSupportedTokensLoading,
    isError: isSupportedTokensError,
    isSuccess: isSuccessSupportedTokens,
  } = useSupportedTokensQuery({
    client: apiClient.current,
  });

  const isSupportAllTokens = supportedTokensData?.isSupportAllTokens;

  let tokens = [];

  if (!isSupportAllTokens) {
    const { exactTokenIDs = [] } = supportedTokensData;
    tokens = exactTokenIDs
      .map((exactTokenID) => tokensMetaData?.find(({ tokenID }) => tokenID === exactTokenID))
      .filter((token) => token);
  } else {
    tokens = tokensMetaData || [];
  }

  const isLoading = isTokensMetaDataLoading || isSupportedTokensLoading;
  const isSuccess = isSuccessTokensMetaData && isSuccessSupportedTokens;
  const isError = (!tokens && isSupportedTokensError) || isTokensMetaDataError;

  const nonNativeTokens = tokens.filter(({ chainID }) => chainID !== application.chainID);
  const nativeTokens = tokens.filter(({ chainID }) => chainID === application.chainID);

  return {
    data: [...nativeTokens, ...nonNativeTokens],
    isLoading,
    isSuccess,
    isError,
  };
}
