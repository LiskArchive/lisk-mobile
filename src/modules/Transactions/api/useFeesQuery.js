import { API_URL } from 'utilities/api/constants';
import { GET_FEES_QUERY } from 'utilities/api/queries';
import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

/**
 * Requests fee estimates of a network.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The fee estimate per byte used for transaction fee calculation.
 */
export function useFeesQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/fees`,
    method: 'get',
    event: 'get.fees',
    ...customConfig,
  };

  const keys = useQueryKeys([GET_FEES_QUERY, config]);

  return useCustomQuery({ config, options, keys });
}
