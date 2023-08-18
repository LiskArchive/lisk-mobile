import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_FULL_DATA_QUERY } from 'utilities/api/queries';
import { addTokensMetaData } from '../utils/accounts.utils';

/**
 * Fetches off-chain and on-chain tokens data and merge them together.
 * @param {String} address - Address of the account to fetch the tokens from.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns {Object} The query state of the API call. Includes the data
 * (tokens full data), loading state, error state, and more.
 */
export function useAccountTokensFullDataQuery(
  address,
  { config: customConfig = {}, options = {} } = {}
) {
  const transformTokensResult = async (res) => {
    const tokensData = await addTokensMetaData(res.data);

    return {
      ...res,
      data: tokensData,
    };
  };

  const config = {
    url: `${API_URL}/token/balances`,
    method: 'GET',
    event: 'get.token.balances',
    ...customConfig,
    params: {
      address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
    transformResult: transformTokensResult,
  };

  const keys = useQueryKeys([GET_ACCOUNT_TOKENS_FULL_DATA_QUERY, address, config]);

  return useCustomInfiniteQuery({
    keys,
    config,
    options,
  });
}
