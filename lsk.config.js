const isTestnet = process.env.network === 'testnet';

export default {
  isTestnet,
  nodeURL: 'https://testnet.lisk.io',
  serviceURL: 'https://service.lisk.io',
  requestOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
