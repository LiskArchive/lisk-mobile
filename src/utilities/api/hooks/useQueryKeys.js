import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { METHOD } from 'utilities/api/constants';
import { APPLICATION } from '../queries';

export function useQueryKeys(keys) {
  const [currentApplication] = useCurrentApplication();

  return [...keys, currentApplication.data?.chainID, APPLICATION, METHOD];
}
