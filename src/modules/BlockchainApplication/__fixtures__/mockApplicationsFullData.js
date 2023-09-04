import { mockApplicationsMeta } from './mockApplicationsMeta';
import { mockApplications } from './mockApplications';

export const mockApplicationsFullData = mockApplicationsMeta.map((appMetadata) => {
  const app = mockApplications.find((_app) => _app.chainID === appMetadata.chainID);

  return { ...appMetadata, ...app };
});
