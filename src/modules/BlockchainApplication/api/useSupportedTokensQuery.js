import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_SUPPORTED_TOKENS_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

/**
 * Fetch list of supported tokens within Lisk ecosystem.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (supported tokens), loading state, error state, and more.
 */
export function useSupportedTokensQuery({ config: customConfig = {}, options, client } = {}) {
  const config = {
    url: `${API_URL}/token/summary`,
    method: 'GET',
    event: 'get.token.summary',
    ...customConfig,
    params: customConfig?.params,
  };

  const keys = useQueryKeys([GET_SUPPORTED_TOKENS_QUERY, config]);

  return useCustomQuery({
    keys,
    config,
    options,
    client,
  });
}
