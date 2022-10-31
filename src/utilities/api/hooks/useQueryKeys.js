// eslint-disable-next-line import/no-cycle
import { useBlockchainApplicationsManagement } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationManagement';
import { METHOD } from 'utilities/api/constants';
import { APPLICATION } from '../queries';

export function useQueryKeys(keys) {
  const { currentApplication } = useBlockchainApplicationsManagement();

  return [...keys, currentApplication?.chainID, APPLICATION, METHOD];
}
