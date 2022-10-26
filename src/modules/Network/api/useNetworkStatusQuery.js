import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { API_URL } from 'utilities/api/constants';
import { GET_NETWORK_STATUS_QUERY } from 'utilities/api/queries';
import { useQueryKeys } from '../../../utilities/api/hooks/useQueryKeys';

/**
 * Creates a custom hook for network status query
 *
 * @param {object} configuration - the custom query configuration object
 * @param {object} configuration.config - the query config
 * @param {object} configuration.config.params - the query parameters
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
export function useNetworkStatusQuery({ config: customConfig = {}, options } = {}) {
  const config = {
    url: `${API_URL}/network/status`,
    method: 'get',
    event: 'get.network.status',
    ...customConfig,
  };

  const keys = useQueryKeys([GET_NETWORK_STATUS_QUERY, config]);

  return useCustomQuery({
    keys,
    config,
    options,
  });
}
