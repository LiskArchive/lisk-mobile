import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_AUTH_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

/**
 * Query that fetches on on-chain auth data of a given account.
 * @param {string} address - Address of the account to query the auth data from.
 * @param {object} configuration - Custom query configurations.
 * @param {object} configuration.config - The query config object.
 * @param {QueryOptions} configuration.options - The query options object.
 * @returns {QueryResult} The query result object.
 */
export function useAuthQuery(address, { config: customConfig = {}, options } = {}) {
  const config = {
    url: `${API_URL}/auth`,
    method: 'get',
    event: 'get.auth',
    ...customConfig,
    params: {
      ...(customConfig?.params || {}),
      address,
    },
  };

  const keys = useQueryKeys([GET_AUTH_QUERY, config]);

  return useCustomQuery({
    keys,
    config,
    options: {
      ...options,
      enabled: !!address,
    },
  });
}
