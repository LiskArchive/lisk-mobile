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
      http: process.env.SERVICE_API_BASE_URL || 'http://localhost:9901',
      ws: process.env.SERVICE_WS_BASE_URL || 'wss://localhost:9901/blockchain',
    },
  ],
  logo: {
    png: 'https://lisk-qa.ams3.digitaloceanspaces.com/Artboard%201%20copy%2019.png',
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
