import liskAPIClient from 'utilities/api/LiskAPIClient';
import { getApplicationsQueryConfigCreator } from './api/useApplicationsQuery';

/**
 * Merges on-chain and off-chain applications data into a single array of objects
 * by intercepting GET_APPLICATIONS_QUERY with GET_APPLICATIONS_META_QUERY before.
 * @param {Function} createConfig - Function to create the GET_APPLICATIONS_META_QUERY
 * based on GET_APPLICATIONS_QUERY results.
 * @param {Object} client - API client instance (default: liskAPIClient).
 */
const mergeApplicationsData =
  ({ createConfig, client }) =>
  async (applicationsMeta) => {
    try {
      const chainIDs = applicationsMeta?.map(({ chainID }) => chainID).join(',');

      if (!chainIDs) {
        return applicationsMeta;
      }

      const metaConfig = createConfig({
        params: {
          chainID: chainIDs,
          limit: applicationsMeta.length,
        },
      });

      const applicationsData = await client.call(metaConfig);

      return applicationsMeta.map((appMeta) => {
        const selectedAppData = applicationsData?.data?.find(
          (appData) => appData.chainID === appMeta.chainID
        );

        return { ...(selectedAppData ?? {}), ...appMeta };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Applications management data error:', error);

      return applicationsMeta;
    }
  };

/**
 *
 * @param {Object} res
 * @returns
 */
export async function transformApplicationsMetaQueryResult(res) {
  const transformApplications = mergeApplicationsData({
    createConfig: getApplicationsQueryConfigCreator(),
    client: liskAPIClient,
  });

  const applicationsData = await transformApplications(res.data);

  return {
    ...res,
    data: applicationsData,
  };
}

/**
 * Calculates current application data by merging applications of-chain
 * and on-chain data.
 * @param {Object} applicationsMetadata
 * @param {Object} applicationsData
 * @returns - Current application data.
 */
export function getCurrentApplicationData(applicationsMetadata, applicationsData) {
  const applicationMetadata = applicationsMetadata[0];

  const applicationData = applicationsData.find(
    (appData) => appData.chainID === applicationMetadata.chainID
  );

  return { ...applicationMetadata, ...applicationData };
}
