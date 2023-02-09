import apiClient from 'utilities/api/APIClient';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_FULL_DATA_QUERY } from 'utilities/api/queries';

import { getTokensMetaQueryConfig } from 'modules/BlockchainApplication/api/useTokensMetaQuery';

async function transformTokensResult(res) {
  const transformTokens = async (tokens) => {
    try {
      const tokensIDs = tokens?.map(({ tokenID }) => tokenID).join(',');

      if (!tokensIDs) {
        return tokens;
      }

      const metaConfig = getTokensMetaQueryConfig({
        params: {
          tokenID: tokensIDs,
        },
      });

      const tokenMetaRes = await apiClient.call(metaConfig);

      return tokens.map((tokenData) => {
        const selectedTokenMetaData = tokenMetaRes?.data?.find(
          (tokenMetaData) => tokenMetaData.tokenID === tokenData.tokenID
        );

        return { ...(selectedTokenMetaData ?? {}), ...tokenData };
      });
    } catch (error) {
      return tokens;
    }
  };

  const tokensData = await transformTokens(res.data);

  return {
    ...res,
    data: tokensData,
  };
}

/**
 * Fetches off-chain and on-chain tokens data and merge them together.
 * @returns {Object} Available account tokens on and off-chain data.
 */
export function useAccountTokensFullDataQuery({ config: customConfig = {}, options = {} } = {}) {
  const [currentAccount] = useCurrentAccount();

  const config = {
    url: `${API_URL}/tokens`,
    method: 'get',
    event: 'get.tokens',
    ...customConfig,
    params: {
      address: currentAccount.metadata.address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
    transformResult: transformTokensResult,
  };

  const keys = useQueryKeys([
    GET_ACCOUNT_TOKENS_FULL_DATA_QUERY,
    currentAccount.metadata.address,
    config,
  ]);

  return useCustomInfiniteQuery({
    keys: [...keys],
    config,
    options,
  });
}
