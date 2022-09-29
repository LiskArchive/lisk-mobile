import { useMemo, useRef } from 'react';

import { APIClient } from 'utilities/api/APIClient';
import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';
import { useSupportedTokensQuery } from './useSupportedTokensQuery';
import { useTokensMetaQuery } from './useTokensMetaQuery';

export function useApplicationSupportedTokensQuery(application) {
  const apiClient = useRef(new APIClient());

  if (application?.serviceURLs?.length) {
    apiClient.current.create(application.serviceURLs[0]);
  }

  const {
    data: tokensMetaData,
    isLoading: isTokensMetaLoading,
    error: errorOnTokensMeta,
    isError: isTokensMetaError,
  } = useTokensMetaQuery();

  const {
    data: { data: accountTokensData = [] } = {},
    isLoading: isAccountTokensLoading,
    isError: isAccountTokensError,
    error: errorOnAccountTokens,
  } = useAccountTokensQuery();

  const {
    data: { data: { supportedTokens: supportedTokensData = [] } = {} } = {},
    isLoading: isSupportedTokensLoading,
    isError: isSupportedTokensError,
    error: errorOnSupportedTokens,
  } = useSupportedTokensQuery({ client: apiClient.current });

  const data = useMemo(() => {
    const isSupportAllToken = supportedTokensData.length === 0;

    console.log({ accountTokensData });

    const tokensOnChainData = isSupportAllToken
      ? accountTokensData
      : accountTokensData.filter(
          (token) =>
            supportedTokensData.find((supportedToken) => supportedToken.symbol === token.symbol)
              .length
        );

    const tokens = tokensMetaData?.data?.map((tokenMeta) => ({
      ...tokenMeta,
      ...tokensOnChainData.find((tokenOnChain) => tokenOnChain.tokenID === tokenMeta.tokenID),
    }));

    return tokens;
  }, [accountTokensData, supportedTokensData, tokensMetaData]);

  return {
    data,
    isSupportedTokensLoading,
    isAccountTokensLoading,
    isTokensMetaLoading,
    isError: isSupportedTokensError || isAccountTokensError || isTokensMetaError,
    isLoading: isAccountTokensLoading || isSupportedTokensLoading || isTokensMetaLoading,
    errorOnSupportedTokens,
    errorOnAccountTokens,
    errorOnTokensMeta,
  };
}
