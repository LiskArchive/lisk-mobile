export const mockDefaultApplicationMeta = {
  chainName: 'Lisk',
  chainID: '04000000',
  title: 'Lisk blockchain application',
  description: 'Lisk is a blockchain application platform',
  networkType: 'alphanet',
  isDefault: true,
  genesisURL: 'https://downloads.lisk.com/lisk/alphanet/genesis_block.json.tar.gz',
  projectPage: 'https://lisk.com',
  serviceURLs: [
    {
      http: process.env.SERVICE_API_BASE_URL,
      ws: process.env.SERVICE_WS_BASE_URL,
    },
  ],
  logo: {
    png: 'https://downloads.lisk.com/lisk/images/logo.png',
    svg: 'https://downloads.lisk.com/lisk/images/logo.svg',
  },
  appPage: 'https://lisk.com',
  backgroundColor: '#0981D1',
  explorers: [
    {
      url: 'https://lisk.observer',
      txnPage: 'https://lisk.observer/transactions',
    },
  ],
  appNodes: [
    {
      url: 'https://alphanet.lisk.com',
      maintainer: 'Lightcurve GmbH',
    },
  ],
};
