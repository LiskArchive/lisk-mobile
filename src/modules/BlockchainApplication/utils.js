import liskAPIClient from 'utilities/api/LiskAPIClient';
import { getApplicationsQueryConfigCreator } from './api/useApplicationsQuery';

/**
 * Merges on-chain and off-chain applications data into a single array of objects
 * by intercepting GET_APPLICATIONS_QUERY with GET_APPLICATIONS_META_QUERY before.
 * @param {Function} createQueryConfig - Function to create the GET_APPLICATIONS_META_QUERY
 * based on GET_APPLICATIONS_QUERY results.
 * @param {Object} apiClient - API client instance (default: liskAPIClient).
 */
function getApplicationsQueryTransformer({ createQueryConfig, apiClient }) {
  return async (applicationsMeta) => {
    try {
      const chainIDs = applicationsMeta?.map(({ chainID }) => chainID).join(',');

      if (!chainIDs) {
        return applicationsMeta;
      }

      const metaConfig = createQueryConfig({
        params: {
          chainID: chainIDs,
          limit: applicationsMeta.length,
        },
      });

      const applicationsData = await apiClient.call(metaConfig);

      return applicationsMeta.map((appMeta) => {
        const selectedAppData = applicationsData?.data?.find(
          (appData) => appData.chainID === appMeta.chainID
        );

        return { ...(selectedAppData ?? {}), ...appMeta };
      });
    } catch (error) {
      return applicationsMeta;
    }
  };
}

/**
 * Injects to GET_APPLICATIONS_QUERY chainID params the result apps fetched from
 * GET_APPLICATIONS_META_QUERY.
 * @param {Object} res - GET_APPLICATIONS_META_QUERY result.
 * @returns - Merged apps resulting from GET_APPLICATIONS_META_QUERY and
 * GET_APPLICATIONS_QUERY.
 */
export async function transformApplicationsMetaQueryResult(res) {
  const transformApplications = getApplicationsQueryTransformer({
    createQueryConfig: getApplicationsQueryConfigCreator(),
    apiClient: liskAPIClient,
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
 * @param {Object} applicationsMetadata - Applications off-chain data.
 * @param {Object} applicationsData - Applications on-chain data.
 * @returns - Current application data.
 */
export function getCurrentApplicationData(applicationsMetadata, applicationsData) {
  const applicationMetadata = applicationsMetadata[0];

  const applicationData = applicationsData.find(
    (appData) => appData.chainID === applicationMetadata.chainID
  );

  return { ...applicationMetadata, ...applicationData };
}

/**
 * Determines if a given chainID belongs to a mainchain application.
 * @param {string} chainID - Chain ID of the application to evaluate.
 * @returns {boolean} True if the provided ID belongs to a mainchain application, false if not.
 */
export function isMainchainApplication(chainID) {
  return chainID.endsWith('0000');
}
