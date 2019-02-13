import { APIClient } from '@liskhq/lisk-client';

const createLiskAPIClient = (network = process.env.network) => {
  if (network === 'testnet') {
    return APIClient.createTestnetAPIClient({ node: 'https://testnet.lisk.io' });
  }

  return APIClient.createMainnetAPIClient();
};

export default createLiskAPIClient();
