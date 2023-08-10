import { mockDefaultApplicationMeta } from './mockDefaultApplicationMeta';

export const mockApplicationsMeta = [
  mockDefaultApplicationMeta,
  ...[...new Array(100)].map((_, index) => ({
    chainName: `app_mainchain_${index}`,
    displayName: `App ${index}`,
    chainID: index.toString(16).padStart(8, '0'), // 8-digit hex representation
    title: `App - Mainnet ${index}`,
    description: `Metadata configuration for the App blockchain (mainchain) in mainnet_${index}`,
    networkType: 'betanet',
    isDefault: index % 2 === 0, // Even index -> true, odd index -> false
    status: 'active',
    genesisURL: 'https://downloads.lisk.com/lisk/betanet/genesis_block.json.tar.gz',
    projectPage: 'https://lisk.com',
    serviceURLs: [
      {
        http: 'https://betanet-service.lisk.com',
        ws: 'wss://betanet-service.lisk.com',
        apiCertificatePublicKey:
          '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtz6qaTSCNwtGrdPJTori\n/CQCG5/ozu6IRIwAwNeB4YpYcUti3a16braLtC+9ElZ5S+S1hPS+nix3hlzuXm2z\ndpsgfHBuw16NO/9Hk1IbNMJOQD3KDY7GTeBebyBSVC9T5JEAQyTBm6elhIGvGlxZ\naQLV2vvZ2nR8T3UhECGOjtBurrCem5bLtJvg+XZXiTn27xQ1nEwUtm0rH1CJgSt7\nhVjQcAerNLaP58f1O521vgHr79UrJWLxqhjdNIccDZ4kWRCBdvnDBaKz2yI6sYhU\nD8OuPxvwXkrT7DX8GvODMOgf6NYqJIb8TD3wjoR/wWJHUG2Bc9v6eQScAFmCc/FL\n+wIDAQAB\n-----END PUBLIC KEY-----',
      },
    ],
    logo: {
      png: 'https://raw.githubusercontent.com/LiskHQ/app-registry/main/betanet/Lisk/images/application/lisk.png',
      svg: 'https://raw.githubusercontent.com/LiskHQ/app-registry/main/betanet/Lisk/images/application/lisk.svg',
    },
    explorers: [
      {
        url: 'https://betanet.liskscan.com',
        txnPage: 'https://betanet.liskscan.com/transactions',
      },
    ],
    appNodes: [
      {
        url: 'https://betanet.lisk.com',
        apiCertificatePublicKey:
          '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtz6qaTSCNwtGrdPJTori\n/CQCG5/ozu6IRIwAwNeB4YpYcUti3a16braLtC+9ElZ5S+S1hPS+nix3hlzuXm2z\ndpsgfHBuw16NO/9Hk1IbNMJOQD3KDY7GTeBebyBSVC9T5JEAQyTBm6elhIGvGlxZ\naQLV2vvZ2nR8T3UhECGOjtBurrCem5bLtJvg+XZXiTn27xQ1nEwUtm0rH1CJgSt7\nhVjQcAerNLaP58f1O521vgHr79UrJWLxqhjdNIccDZ4kWRCBdvnDBaKz2yI6sYhU\nD8OuPxvwXkrT7DX8GvODMOgf6NYqJIb8TD3wjoR/wWJHUG2Bc9v6eQScAFmCc/FL\n+wIDAQAB\n-----END PUBLIC KEY-----',
        maintainer: 'Lightcurve GmbH',
      },
      {
        url: 'wss://betanet.lisk.com',
        apiCertificatePublicKey:
          '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtz6qaTSCNwtGrdPJTori\n/CQCG5/ozu6IRIwAwNeB4YpYcUti3a16braLtC+9ElZ5S+S1hPS+nix3hlzuXm2z\ndpsgfHBuw16NO/9Hk1IbNMJOQD3KDY7GTeBebyBSVC9T5JEAQyTBm6elhIGvGlxZ\naQLV2vvZ2nR8T3UhECGOjtBurrCem5bLtJvg+XZXiTn27xQ1nEwUtm0rH1CJgSt7\nhVjQcAerNLaP58f1O521vgHr79UrJWLxqhjdNIccDZ4kWRCBdvnDBaKz2yI6sYhU\nD8OuPxvwXkrT7DX8GvODMOgf6NYqJIb8TD3wjoR/wWJHUG2Bc9v6eQScAFmCc/FL\n+wIDAQAB\n-----END PUBLIC KEY-----',
        maintainer: 'Lightcurve GmbH',
      },
    ],
    backgroundColor: '#a7a7a7',
  })),
];

export const mockMappedApplicationsMeta = mockApplicationsMeta.reduce((obj, val) => {
  obj[val.chainID] = val;
  return obj;
}, {});
