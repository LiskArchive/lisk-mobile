// eslint-disable-next-line import/no-cycle
import { useApplicationsManagement } from 'modules/BlockchainApplication/hooks/useApplicationsManagement';
import { METHOD } from 'utilities/api/constants';
import { APPLICATION } from '../queries';

export function useQueryKeys(keys) {
  const { currentApplication } = useApplicationsManagement();

  return [...keys, currentApplication?.chainID, APPLICATION, METHOD];
}
