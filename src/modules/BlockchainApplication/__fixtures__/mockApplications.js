import { mockDefaultApplication } from './mockDefaultApplication';

export const mockApplications = [
  mockDefaultApplication,
  ...[...new Array(100)].map((_, index) => ({
    chainName: `app_mainchain_${index}`,
    chainID: index.toString(16).padStart(8, '0'), // 8-digit hex representation
    status: 'active',
    address: 'lskguo9kqnea2zsfo3a6qppozsxsg92nuuma3p7ad',
    lastCertificateHeight: 1460,
    lastUpdated: 1689782730,
    escrow: [
      {
        tokenID: '0400000000000000',
        amount: '100010000000',
      },
    ],
  })),
];
