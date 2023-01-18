/**
 * Merges on-chain and off-chain applications data into a single array of objects.
 * @param {Object} applicationsData
 * @param {Object} applicationsMetaData
 */
export function mergeApplicationsData(applicationsData, applicationsMetaData) {
  return applicationsData.map((appData) => {
    const appMetadata = applicationsMetaData.find(
      (_appMetadata) => _appMetadata.chainID === appData.chainID
    );

    return { ...appData, ...appMetadata };
  });
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
