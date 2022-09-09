export const mockDefaultApplication = {
  chainName: 'Lisk',
  chainID: '00000001',
  title: 'Lisk - Betanet',
  description: 'Metadata configuration for the Lisk blockchain (mainchain) in betanet',
  networkType: 'betanet',
  genesisURL: 'https://downloads.lisk.com/lisk/betanet/genesis_block.json.tar.gz',
  projectPage: 'https://lisk.com',
  serviceURLs: [
    {
      http: 'https://betanet-service.lisk.com',
      ws: 'wss://betanet-service.lisk.com'
    }
  ],
  logo: {
    png: 'https://lisk-qa.ams3.digitaloceanspaces.com/Artboard%201%20copy%2019.png',
    svg: 'https://lisk-qa.ams3.digitaloceanspaces.com/Logo-20.svg'
  },
  explorers: [
    {
      url: 'https://betanet.liskscan.com',
      txnPage: 'https://betanet.liskscan.com/transactions'
    }
  ],
  appNodes: [
    {
      url: 'https://betanet.lisk.com',
      maintainer: 'Lightcurve GmbH'
    },
    {
      url: 'wss://betanet.lisk.com',
      maintainer: 'Lightcurve GmbH'
    }
  ],
  backgroundColor: '#f7f9fb'
};
