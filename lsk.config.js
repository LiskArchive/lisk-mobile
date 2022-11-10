const isTestnet = process.env.NETWORK === 'testnet';

export default {
  isTestnet,
  serviceURL: 'https://service.lisk.com/api',
  testnetURL: 'http://165.227.246.146:9901/api',
  networkID: '4c09e6a781fc4c7bdb936ee815de8f94190f8a7519becd9de2081832be309a99',
  testnetNetworkID: '15f0dacc1060e91818224a94286b13aa04279c640bd5d6f193182031d133df7c',
  requestOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
