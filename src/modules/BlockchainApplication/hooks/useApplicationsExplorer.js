import { useApplicationsFullDataQuery } from '../api/useApplicationsFullDataQuery';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @returns {Object} Available blockchain applications on and off-chain data.
 */
export function useApplicationsExplorer() {
  const { data, ...applicationsFullDataQuery } = useApplicationsFullDataQuery();

  return { data: data?.data, ...applicationsFullDataQuery };
}
