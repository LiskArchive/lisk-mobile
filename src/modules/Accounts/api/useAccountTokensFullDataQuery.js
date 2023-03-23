import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_FULL_DATA_QUERY } from 'utilities/api/queries';
import { addTokensMetaData } from '../utils/accounts.utils';

/**
 * Fetches off-chain and on-chain tokens data and merge them together.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns {Object} The query state of the API call. Includes the data
 * (tokens full data), loading state, error state, and more.
 */
export function useAccountTokensFullDataQuery({ config: customConfig = {}, options = {} } = {}) {
  const [currentAccount] = useCurrentAccount();

  const transformTokensResult = async (res) => {
    const tokensData = await addTokensMetaData(res.data);

    return {
      ...res,
      data: tokensData,
    };
  };

  const config = {
    url: `${API_URL}/tokens`,
    method: 'get',
    event: 'get.tokens',
    ...customConfig,
    params: {
      address: currentAccount?.metadata?.address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
    transformResult: transformTokensResult,
  };

  const keys = useQueryKeys([
    GET_ACCOUNT_TOKENS_FULL_DATA_QUERY,
    currentAccount?.metadata?.address,
    config,
  ]);

  return useCustomInfiniteQuery({
    keys: [...keys],
    config,
    options: {
      ...options,
      enabled: !!currentAccount?.metadata,
    },
  });
}
