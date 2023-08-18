import { useMemo, useRef } from 'react';

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
  const toApplicationApiClient = useRef(new APIClient());

  toApplicationApiClient.current.create({
    ...application?.serviceURLs[0],
    enableCertPinning: application?.chainName === 'lisk_mainchain',
  });

  const {
    data: { data: tokensMetaData } = {},
    isLoading: isTokensMetaDataLoading,
    isError: isTokensMetaDataError,
    error: errorOnTokensMetaData,
    isSuccess: isSuccessTokensMetaData,
  } = useTokensMetaQuery();

  const {
    data: { data: { supportedTokens: supportedTokensData } = {} } = {},
    isLoading: isSupportedTokensLoading,
    isError: isSupportedTokensError,
    error: errorOnSupportedTokens,
    isSuccess: isSuccessSupportedTokens,
  } = useSupportedTokensQuery({
    client: toApplicationApiClient.current,
  });

  const data = useMemo(() => {
    let tokens;

    if (tokensMetaData && supportedTokensData) {
      const isSupportAllToken = supportedTokensData.isSupportAllToken;

      if (isSupportAllToken) {
        tokens = tokensMetaData;
      } else {
        const exactTokensSupported = tokensMetaData.filter((token) =>
          supportedTokensData.exactTokenIDs.includes(token.tokenID)
        );

        const patternTokensSupported = supportedTokensData.patternTokenIDs
          .map((pattern) => {
            const chainID = pattern.slice(0, 8);
            return tokensMetaData.filter((token) => chainID === token.tokenID.slice(0, 8));
          })
          .flatMap((res) => res);

        const supportedAppTokens = [...(patternTokensSupported || []), ...exactTokensSupported];

        tokens = Array.from(new Set(supportedAppTokens));
      }
    }

    return tokens;
  }, [tokensMetaData, supportedTokensData]);

  return {
    data,
    isLoading: isTokensMetaDataLoading || isSupportedTokensLoading,
    isSuccess: isSuccessTokensMetaData && isSuccessSupportedTokens,
    isError: (!data && isSupportedTokensError) || isTokensMetaDataError,
    error: (!data && errorOnSupportedTokens) || errorOnTokensMetaData,
    errorOnSupportedTokens,
    errorOnTokensMetaData,
  };
}
