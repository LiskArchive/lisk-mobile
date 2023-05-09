import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';
import { APPLICATION_STATUSES } from '../constants';
import { isMainchainApplication, transformApplicationsMetaQueryResult } from '../utils';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @param {'explore' | 'manage'} mode - Mode in which the apps exploring is consumed by the user. For 'explore', all apps are returned including onchain and offchain data. For 'manage', only off-chain data is returned and unregistered apps are excluded. Default: 'explore'
 * @returns {QueryResult<Array<Application>>} Available blockchain applications for users exploring.
 */
export function useApplicationsExplorer(mode = 'manage') {
  let config = {};

  // include on-chain data on the query result on exploring mode.
  if (mode === 'explore') {
    config = { ...config, transformResult: transformApplicationsMetaQueryResult };
  }

  const { data: applicationsData, ...applicationsFullDataQuery } = useApplicationsMetaQuery({
    config,
  });

  let data = applicationsData?.data;

  if (mode === 'explore') {
    // exclude mainchain applications from the data.
    data = applicationsData?.data.filter((app) => !isMainchainApplication(app.chainID));
  }

  // exclude unregistered apps in manage mode.
  if (mode === 'manage') {
    data = data?.filter((app) => app.status !== APPLICATION_STATUSES.unregistered);
  }

  return { data, ...applicationsFullDataQuery };
}
