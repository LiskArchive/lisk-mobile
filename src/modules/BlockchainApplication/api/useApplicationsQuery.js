import Config from 'react-native-config';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { LIMIT, API_URL, METHOD } from 'utilities/api/constants';
import { GET_APPLICATIONS_QUERY, APPLICATION } from 'utilities/api/queries';
import liskAPIClient from 'utilities/api/LiskAPIClient';

/**
 * Fetch list of blockchain applications on-chain data.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (applications), loading state, error state, and more.
 */
export function useApplicationsQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    baseURL: Config.SERVICE_API_BASE_URL,
    url: `${API_URL}/blockchain/apps`,
    method: 'get',
    event: 'get.blockchain.apps',
    ...customConfig,
    params: { limit: LIMIT, ...customConfig.params },
  };

  const keys = [GET_APPLICATIONS_QUERY, config, APPLICATION, METHOD];

  return useCustomInfiniteQuery({ config, options, keys, client: liskAPIClient });
}
