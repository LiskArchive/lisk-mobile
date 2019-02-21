import { APIClient } from '@liskhq/lisk-client';
import config from '../../../../lsk.config';

const createLiskAPIClient = () => {
  if (config.isTestnet) {
    return APIClient.createTestnetAPIClient({ node: config.nodeURL });
  }

  return APIClient.createMainnetAPIClient();
};

export default createLiskAPIClient();
