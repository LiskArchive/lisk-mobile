import { useEffect } from 'react';

import apiClient from 'utilities/api/APIClient';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';

/**
 * Bootstrap the app by calling all previous business logic to load
 * the required data.
 * @param {ReactNode} children - Components tree to provide the loaded data.
 */
export default function AppBootstrapper({ children }) {
  const [currentApplication] = useCurrentApplication();

  // Bootstrap API client with current application.
  useEffect(() => {
    if (currentApplication?.serviceURLs) {
      apiClient.create(currentApplication.serviceURLs[0]);
    }
  }, [currentApplication]);

  return children;
}
