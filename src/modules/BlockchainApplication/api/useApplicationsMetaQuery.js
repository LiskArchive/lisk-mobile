import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_APPLICATIONS_QUERY } from 'utilities/api/queries';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import blockchainAppsMetaAPIClient from 'utilities/api/BlockchainAppsMetaAPIClient';

/**
 * Fetch list of blockchain applications metadata (off-chain data) in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (applications), loading state, error state, and more.
 */
export function useApplicationsMetaQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/blockchain/apps/meta`,
    method: 'get',
    event: 'get.blockchain.apps.meta',
    ...customConfig,
    params: {
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_APPLICATIONS_QUERY, config]);

  return useCustomInfiniteQuery({ config, options, keys, client: blockchainAppsMetaAPIClient });
}
