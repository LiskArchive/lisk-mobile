export const mockDefaultApplication = {
  name: 'Lisk',
  chainID: 1,
  title: 'Lisk',
  description: 'A blockchain application platform',
  network: 'mainnet',
  isDefault: true,
  genesisBlock: 'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
  apis: [{
    rest: 'https://service.lisk.com',
    rpc: ['wss://service.lisk.com'],
  }],
  explorers: ['https://lisk.observer', 'https://explorer.lisk.io'],
  images: {
    logo: {
      png: 'https://avatars.githubusercontent.com/u/16600915?s=200&v=4', // URL
      svg: '', // URL
    },
    background: '#FFFFFF1A', // URL
  },
  deposited: 681782312,
  state: 'active',
};
