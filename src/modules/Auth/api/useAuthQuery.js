import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_AUTH_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';

/**
 * Creates a custom hook for command parameters schemas queries
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
  const config = {
    url: `${API_URL}/fees`,
    method: 'get',
    event: 'get.auth',
    ...customConfig,
  };

  return useCustomQuery({
    keys: [GET_AUTH_QUERY],
    config,
    options,
  });
}
