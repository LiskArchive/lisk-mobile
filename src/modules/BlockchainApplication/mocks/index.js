export const BLOCKCHAIN_APPLICATIONS_MOCK = [
  {
    name: 'Lisk',
    chainID: 'aq02qkbb35u4jdq8szo3pnsq',
    title: 'Lisk',
    description: 'A blockchain application platform',
    network: 'mainnet',
    isDefault: true,
    genesisBlock: 'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: {
      rest: ['https://service.lisk.com'],
      rpc: ['wss://service.lisk.com'],
    },
    explorers: ['https://lisk.observer', 'https://explorer.lisk.io'],
    images: {
      logo: {
        png: 'https://avatars.githubusercontent.com/u/16600915?s=200&v=4', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    deposited: 681782312,
  },
  {
    name: 'Coleti',
    chainID: 'mi34vyyd12g2lkf0rza1irws',
    title: 'Coleti',
    description: 'A Lisk-based NFT marketplace',
    network: 'mainnet',
    isDefault: false,
    genesisBlock: 'https://downloads.coleti.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: {
      rest: ['https://service.coleti.com'],
      rpc: ['wss://service.coleti.com'],
    },
    explorers: ['https://coleti.observer', 'https://explorer.coleti.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-02/colecti-logo.jpeg', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    deposited: 8712312
  },
  {
    name: 'DoEdu',
    chainID: 'aq96eeqk77r4syc8aet9fcey',
    title: 'DoEdu',
    description: 'An educational platform built with Lisk SDK',
    network: 'mainnet',
    isDefault: false,
    genesisBlock: 'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: {
      rest: ['https://service.doedu.com'],
      rpc: ['wss://service.doedu.com'],
    },
    explorers: ['https://doedu.observer', 'https://explorer.doedu.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-02/doedu-logo.jpg', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    deposited: 4872312
  },
  {
    name: 'Enevti',
    chainID: 'aq86llsb35u4syc8aet7xenf',
    title: 'Enevti',
    description: 'A decentralized social media NFT platform',
    network: 'mainnet',
    isDefault: false,
    genesisBlock: 'https://downloads.enevti.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: {
      rest: ['https://service.enevti.com'],
      rpc: ['wss://service.enevti.com'],
    },
    explorers: ['https://enevti.observer', 'https://explorer.enevti.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-02/enevti-logo.png', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    deposited: 4875312
  },
  {
    name: 'Kalipo',
    chainID: 'aq25derd17a4syc8aet3pryt',
    title: 'Kalipo',
    description: 'A platform to support Decentralized Autonomous Organizations (DAOs)',
    network: 'mainnet',
    isDefault: false,
    genesisBlock: 'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: {
      rest: ['https://service.lisk.com'],
      rpc: ['wss://service.lisk.com'],
    },
    explorers: ['https://lisk.observer', 'https://explorer.lisk.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-07/Kalipo.jpg', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    deposited: 4875312
  },
];

export const MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK = BLOCKCHAIN_APPLICATIONS_MOCK.reduce(
  (obj, val) => {
    obj[val.chainID] = val;
    return obj;
  },
  {}
);
