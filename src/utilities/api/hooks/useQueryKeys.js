import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { METHOD } from 'utilities/api/constants';
import { APPLICATION } from '../queries';

export function useQueryKeys(keys) {
  const [currentApplication] = useCurrentBlockchainApplication();

  return [...keys, currentApplication?.chainID, APPLICATION, METHOD];
}
