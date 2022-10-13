import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import apiClient from 'utilities/api/APIClient';

export function useAccountTokensQueryParams({ config: customConfig = {} } = {}) {
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
  };

  const keys = useQueryKeys([GET_ACCOUNT_TOKENS_QUERY, currentAccount.metadata.address, config]);

  return { config, keys };
}

/**
 * Fetch list of tokens available for a given user account.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @param {Object} client - Custom API client for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useAccountTokensQuery({
  config: customConfig = {},
  options = {},
  client = apiClient,
} = {}) {
  const { config, keys } = useAccountTokensQueryParams({ config: customConfig });

  return useCustomInfiniteQuery({ config, options, keys, client });
}
