import { useContext } from 'react';

import { ApplicationsContext } from '../context/ApplicationsContext';

/**
 * Allows to consume Blockchain Applications Management context value as hook.
 * @returns {Object} value - Blockchain Applications Management context value.
 */
export function useApplicationsManagement() {
  return useContext(ApplicationsContext);
}
