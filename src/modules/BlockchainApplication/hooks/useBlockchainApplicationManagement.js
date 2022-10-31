import { useContext } from 'react';

import { BlockchainApplicationsManagementContext } from '../context/BlockchainApplicationsManagementContext';

/**
 * Allows to consume Blockchain Applications Management context value as hook.
 * @returns {Object} value - Blockchain Applications Management context value.
 */
export function useBlockchainApplicationsManagement() {
  return useContext(BlockchainApplicationsManagementContext);
}
