import {
  LIMIT,
  API_URL,
  API_BASE_URL
} from 'utilities/api/constants';
import { GET_APPLICATIONS_QUERY } from 'utilities/api/queries';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { mockApplications } from '../__fixtures__';

/**
 * Fetch user account applications in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (with the array of applications), loading state, error state, and more.
 */
export function useGetApplicationsMetaQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    baseURL: API_BASE_URL,
    url: `${API_URL}/blockchain/apps`,
    method: 'get',
    event: 'get.blockchainApps',
    ...customConfig,
    params: {
      limit: LIMIT,
      ...(customConfig?.params || {})
    },
  };

  const keys = [GET_APPLICATIONS_QUERY];

  const query = useCustomInfiniteQuery({ config, options, keys });

  return {
    ...query,
    data: {
      ...query.data,
      // TODO: Replace with api response
      data: mockApplications,
    }
  };
}
