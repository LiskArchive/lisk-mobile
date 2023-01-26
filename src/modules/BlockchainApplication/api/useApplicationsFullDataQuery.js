import { useApplicationsMetaQuery } from './useApplicationsMetaQuery';
import { transformApplicationsMetaQueryResult } from '../utils';

/**
 * Fetches off-chain and on-chain applications data and merge them together.
 * @returns {Object} Available blockchain applications on and off-chain data.
 */
export function useApplicationsFullDataQuery({ config: customConfig = {}, options = {} } = {}) {
  return useApplicationsMetaQuery({
    config: { transformResult: transformApplicationsMetaQueryResult, ...customConfig },
    options,
  });
}
