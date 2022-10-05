import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { METHOD, LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';

/**
 * Fetch list of tokens available for a given user account.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @param {Object} client - Custom API client for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useAccountTokensQuery({ config: customConfig = {}, options = {}, client } = {}) {
  const [currentAccount] = useCurrentAccount();

  const address = currentAccount.metadata.address;

  const config = {
    url: `${API_URL}/tokens`,
    method: 'get',
    event: 'get.accountTokens',
    ...customConfig,
    params: {
      address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = [GET_ACCOUNT_TOKENS_QUERY, METHOD, address, currentAccount.chainID, config];

  return useCustomInfiniteQuery({ config, options, keys, client });
}
