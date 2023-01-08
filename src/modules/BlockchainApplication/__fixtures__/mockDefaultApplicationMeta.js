export const mockDefaultApplicationMeta = {
  chainName: 'Lisk',
  chainID: '04000000',
  title: 'Lisk - Betanet',
  description: 'Metadata configuration for the Lisk blockchain (mainchain) in betanet',
  networkType: 'betanet',
  genesisURL: 'https://downloads.lisk.com/lisk/betanet/genesis_block.json.tar.gz',
  projectPage: 'https://lisk.com',
  serviceURLs: [
    {
      http: process.env.SERVICE_API_BASE_URL,
      ws: process.env.SERVICE_WS_BASE_URL,
    },
  ],
  logo: {
    png: 'https://lisk-qa.ams3.digitaloceanspaces.com/Artboard%201%20copy%2019.png',
    svg: 'https://lisk-qa.ams3.digitaloceanspaces.com/Logo-20.svg',
  },
  explorers: [
    {
      url: 'https://betanet.liskscan.com',
      txnPage: 'https://betanet.liskscan.com/transactions',
    },
  ],
  appNodes: [
    {
      url: 'http://104.248.241.229:9901',
      maintainer: 'Lightcurve GmbH',
    },
    {
      url: 'wss://104.248.241.229:9901',
      maintainer: 'Lightcurve GmbH',
    },
  ],
  backgroundColor: '#f7f9fb',
};
