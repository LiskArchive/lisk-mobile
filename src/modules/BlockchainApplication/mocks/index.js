const LISK_BLOCKCHAIN_APPLICATION = {
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
}

export const BLOCKCHAIN_APPLICATIONS_MOCK = [LISK_BLOCKCHAIN_APPLICATION].concat(
  [...new Array(5)].map((_, index) => ({
    name: `Application ${index}`,
    chainID: `app${index}chainID`,
    title: `Application ${index} title`,
    description: `Application ${index} description`,
    network: 'mainnet',
    isDefault: false,
    genesisBlock: `https://downloads.app${index}.com/app${index}/mainnet/genesis_block.json.tar.gz`,
    apis: {
      rest: [`https://service.app${index}.com`],
      rpc: [`wss://service.app${index}.com`],
    },
    explorers: [`https://app${index}.observer`, `https://explorer.app${index}.io`],
    images: {
      logo: {
        png: `https://picsum.photos/id/${index}/20/20`, // URL
        svg: '', // URL
      },
      background: '#FFFFFF', // URL
    },
  }))
)

export const MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK = BLOCKCHAIN_APPLICATIONS_MOCK.reduce(
  (obj, val) => {
    obj[val.chainID] = val
    return obj
  },
  {}
)
