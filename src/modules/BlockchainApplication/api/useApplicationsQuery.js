import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_APPLICATION_QUERY } from 'utilities/api/queries';
import {
  API_URL,
  API_BASE_URL
} from 'utilities/api/constants';

/**
   * Fetch a blockchain application on-chain data.
   * Executes the API call once the hook is mounted.
   * @param {Object} config - Custom configurations for the query.
   * @param {Object} options - Custom options for the query.
   * @returns - The query state of the API call. Includes the data
   * (application), loading state, error state, and more.
*/
export function useApplicationQuery(
  chainID,
  { config: customConfig = {}, options = {} } = {}
) {
  const config = {
    baseURL: API_BASE_URL,
    url: `${API_URL}/blockchain/apps`,
    method: 'get',
    event: 'get.blockchainApplication',
    ...customConfig,
    params: { chainID, ...customConfig.params },
  };

  const keys = [GET_APPLICATION_QUERY];

  const query = useCustomQuery({ config, options, keys });

  return query;
}
