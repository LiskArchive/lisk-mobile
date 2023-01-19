import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';
import { transformApplicationsMetaQueryResult } from '../utils';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @returns {Object} Available blockchain applications on and off-chain data.
 */
export function useApplicationsExplorer() {
  const { data, ...applicationsQuery } = useApplicationsMetaQuery({
    config: { transformResult: transformApplicationsMetaQueryResult },
  });

  return { data: data?.data, ...applicationsQuery };
}
