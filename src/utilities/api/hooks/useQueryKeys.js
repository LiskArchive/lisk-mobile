import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { METHOD } from 'utilities/api/constants';
import { APPLICATION } from '../queries';

export function useQueryKeys(keys) {
  const [{ chainID }] = useCurrentBlockchainApplication();

  return [chainID, APPLICATION, METHOD, ...keys];
}
