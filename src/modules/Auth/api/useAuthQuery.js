import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_AUTH_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

export function useAuthQueryParams({ config: customConfig = {} } = {}) {
  const [currentAccount] = useCurrentAccount();

  const config = {
    url: `${API_URL}/auth`,
    method: 'get',
    event: 'get.auth',
    ...customConfig,
    params: {
      ...(customConfig?.params || {}),
      address: currentAccount?.metadata?.address,
    },
  };

  const keys = useQueryKeys([GET_AUTH_QUERY, config]);

  return { config, keys };
}

/**
 * Creates a custom hook for auth details query.
 *
 * @param {object} configuration - the custom query configuration object
 * @param {Object} configuration.config - the query config
 * @param {Object} configuration.config.params - the query config params
 * @param {string} configuration.config.params.address - auth address
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
export function useAuthQuery({ config: customConfig = {}, options } = {}) {
  const [currentAccount] = useCurrentAccount();
  const { config, keys } = useAuthQueryParams({ config: customConfig });

  return useCustomQuery({
    keys,
    config,
    options: {
      ...options,
      enabled: !!currentAccount?.metadata,
    },
  });
}
