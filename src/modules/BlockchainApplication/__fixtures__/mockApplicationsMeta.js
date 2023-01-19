import { mockDefaultApplicationMeta } from './mockDefaultApplicationMeta';

export const mockApplicationsMeta = [
  mockDefaultApplicationMeta,
  {
    chainName: 'Coleti',
    chainID: '00000002',
    title: 'Coleti - Betanet',
    description: 'A Lisk-based NFT marketplace',
    networkType: 'mainnet',
    isDefault: true,
    genesisURL: 'https://downloads.coleti.com/lisk/mainnet/genesis_block.json.tar.gz',
    projectPage: 'https://coleti.com',
    serviceURLs: [
      {
        http: 'https://service.coleti.com',
        ws: 'wss://service.coleti.com',
      },
      {
        http: 'https://service2.coleti.com',
        ws: 'wss://service2.coleti.com',
      },
    ],
    logo: {
      png: 'https://lisk.com/sites/default/files/2022-02/colecti-logo.jpeg',
      svg: '',
    },
    appPage: 'https://coleti.com',
    backgroundColor: '#FFFFFF1A',
    explorers: [{ tnxPage: 'https://coleti.observer', url: 'https://explorer.coleti.io' }],
    appNodes: [
      {
        url: 'https://betanet.coleti.com',
        maintainer: 'Coleti GmbH',
      },
      {
        url: 'wss://betanet.coleti.com',
        maintainer: 'Coleti GmbH',
      },
    ],
  },
  {
    chainName: 'DoEdu',
    chainID: '00000003',
    title: 'DoEdu - Betanet',
    isDefault: false,
    description: 'An educational platform built with Lisk SDK',
    networkType: 'mainnet',
    genesisURL: 'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    projectPage: 'https://doedu.com',
    serviceURLs: [
      {
        http: 'https://service.doedu.com',
        ws: 'wss://service.doedu.com',
      },
    ],
    logo: {
      png: 'https://lisk.com/sites/default/files/2022-02/doedu-logo.jpg',
      svg: '',
    },
    appPage: 'https://docuedu.com',
    backgroundColor: '#FFFFFF1A',
    explorers: [{ tnxPage: 'https://doedu.observer', url: 'https://explorer.doedu.io' }],
    appNodes: [
      {
        url: 'https://betanet.doedu.com',
        maintainer: 'DoEdu GmbH',
      },
      {
        url: 'wss://betanet.lisk.com',
        maintainer: 'DoEdu GmbH',
      },
    ],
  },
  {
    chainName: 'Enevti',
    chainID: '00000004',
    title: 'Enevti - Betanet',
    isDefault: true,
    description: 'A decentralized social media NFT platform',
    networkType: 'mainnet',
    genesisURL: 'https://downloads.enevti.com/lisk/mainnet/genesis_block.json.tar.gz',
    projectPage: 'https://enevti.com',
    serviceURLs: [
      {
        http: 'https://service.enevti.com',
        ws: 'wss://service.enevti.com',
      },
    ],
    logo: {
      png: 'https://lisk.com/sites/default/files/2022-02/enevti-logo.png',
      svg: '',
    },
    appPage: 'https://enevti.com',
    backgroundColor: '#FFFFFF1A',
    explorers: [{ tnxPage: 'https://enevti.observer', url: 'https://explorer.enevti.io' }],
    appNodes: [
      {
        url: 'https://betanet.enevti.com',
        maintainer: 'Enevti GmbH',
      },
      {
        url: 'wss://betanet.enevti.com',
        maintainer: 'Enevti GmbH',
      },
    ],
  },
  {
    chainName: 'Kalipo',
    chainID: '00000005',
    title: 'Kalipo - Betanet',
    isDefault: false,
    description: 'A platform to support Decentralized Autonomous Organizations (DAOs)',
    networkType: 'mainnet',
    genesisURL: 'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    projectPage: 'https://kalipo.com',
    serviceURLs: [
      {
        http: 'https://service.kalipo.com',
        ws: 'wss://service.kalipo.com',
      },
    ],
    logo: {
      png: 'https://lisk.com/sites/default/files/2022-07/Kalipo.jpg',
      svg: '',
    },
    appPage: 'https://kalipo.com',
    backgroundColor: '#FFFFFF1A',
    explorers: [{ tnxPage: 'https://kalipo.observer', url: 'https://explorer.kalipo.io' }],
    appNodes: [
      {
        url: 'https://betanet.kalipo.com',
        maintainer: 'Kalipo GmbH',
      },
      {
        url: 'wss://betanet.kalipo.com',
        maintainer: 'Kalipo GmbH',
      },
    ],
  },
];

export const mockMappedApplicationsMeta = mockApplicationsMeta.reduce((obj, val) => {
  obj[val.chainID] = val;
  return obj;
}, {});
