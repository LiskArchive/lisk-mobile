import { useMemo, useRef } from 'react';

import { APIClient } from 'utilities/api/APIClient';
import { useSupportedTokensQuery } from './useSupportedTokensQuery';
import { useAccountTokensFullDataQuery } from '../../Accounts/api/useAccountTokensFullDataQuery';

/**
 * Fetch list of supported tokens for a given account and blockchain application.
 * Executes the API call once the hook is mounted.
 * @param {Object} application - Blockchain application to fetch the supported tokens from.
 * @returns - The query state of the API call. Includes the data
 * (supported tokens), loading state, error state, and more.
 */
export function useApplicationSupportedTokensQuery(application) {
  const toApplicationApiClient = useRef(new APIClient());

  toApplicationApiClient.current.create(application?.serviceURLs[0]);

  const {
    data: { data: accountTokensFullData } = {},
    isLoading: isAccountTokensFullDataLoading,
    isError: isAccountTokensFullDataError,
    error: errorOnAccountTokensFullData,
  } = useAccountTokensFullDataQuery();

  const {
    data: { data: { supportedTokens: supportedTokensData } = {} } = {},
    isLoading: isSupportedTokensLoading,
    isError: isSupportedTokensError,
    error: errorOnSupportedTokens,
  } = useSupportedTokensQuery({
    client: toApplicationApiClient.current,
  });

  const data = useMemo(() => {
    let tokens;

    if (accountTokensFullData && supportedTokensData) {
      const isSupportAllToken = supportedTokensData.isSupportAllToken;

      if (isSupportAllToken) {
        tokens = accountTokensFullData;
      } else {
        const exactTokensSupported = accountTokensFullData.filter((token) =>
          supportedTokensData.exactTokenIDs.includes(token.tokenID)
        );

        const patternTokensSupported = supportedTokensData.patternTokenIDs
          .map((pattern) => {
            const chainID = pattern.slice(0, 8);
            return accountTokensFullData.filter((token) => chainID === token.tokenID.slice(0, 8));
          })
          .flatMap((res) => res);

        const supportedAppTokens = [...(patternTokensSupported || []), ...exactTokensSupported];

        tokens = Array.from(new Set(supportedAppTokens));
      }
    }

    return tokens;
  }, [accountTokensFullData, supportedTokensData]);

  return {
    data,
    isError: isSupportedTokensError || isAccountTokensFullDataError,
    isLoading: isAccountTokensFullDataLoading || isSupportedTokensLoading,
    error: errorOnSupportedTokens || errorOnAccountTokensFullData,
    errorOnSupportedTokens,
    errorOnAccountTokensFullData,
  };
}
