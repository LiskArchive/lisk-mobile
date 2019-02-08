import Lisk from '@liskhq/lisk-client';

export default new Promise((resolve, reject) => {
  const network = process.env.network || 'mainnet';
  const serverAddress = process.env.address || 'http://localhost:4000';
  const config = { nethash: 'net' };

  if (network === 'customNode') {
    config.nodes = [serverAddress];
    const liskAPIClient = new Lisk.APIClient(config.nodes, { nethash: config.nethash });
    // loadingStarted('getConstants');
    liskAPIClient.node.getConstants().then((response) => {
      // loadingFinished('getConstants');
      config.nethash = response.data.nethash;
      resolve(new Lisk.APIClient(config.nodes, {
        nethash: config.nethash,
      }));
    }).catch(error => reject(error));
  } else if (network === 'testnet') {
    config.nodes = Lisk.APIClient.constants.TESTNET_NODES;
    config.nethash = Lisk.APIClient.constants.TESTNET_NETHASH;
    resolve(new Lisk.APIClient(config.nodes, {
      nethash: config.nethash,
    }));
  } else if (network === 'mainnet') {
    config.nodes = Lisk.APIClient.constants.MAINNET_NODES;
    config.nethash = Lisk.APIClient.constants.MAINNET_NETHASH;
    resolve(new Lisk.APIClient(config.nodes, {
      nethash: config.nethash,
    }));
  }
});
