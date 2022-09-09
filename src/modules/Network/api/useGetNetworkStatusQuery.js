import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery'
import { API_VERSION } from 'utilities/api/constants'
import { GET_NETWORK_STATUS } from 'utilities/api/queries'

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
export function useGetNetworkStatusQuery({ config: customConfig = {}, options } = {}) {
  const config = {
    url: `/api/${API_VERSION}/network/status`,
    method: 'get',
    event: 'get.network.status',
    ...customConfig,
  }

  return useCustomQuery({
    keys: [GET_NETWORK_STATUS],
    config,
    options,
  })
}
