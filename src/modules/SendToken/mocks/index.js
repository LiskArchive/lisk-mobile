export const TOKENS_MOCK = [
  {
    tokenID: '2ba563cf98003d',
    name: 'LISK',
    symbol: 'LSK',
    availableBalance: '10000000',
    lockedBalances: [
      {
        moduleID: '5',
        amount: '10000'
      }
    ]
  },
  {
    tokenID: '2bc561cf98009a',
    name: 'COLECTI',
    symbol: 'COL',
    availableBalance: '4000000',
    lockedBalances: [
      {
        moduleID: '4',
        amount: '5000'
      }
    ]
  },
  {
    tokenID: '3as601cd98117m',
    name: 'KALIPO',
    symbol: 'TKN',
    availableBalance: '2900000',
    lockedBalances: [
      {
        moduleID: '5',
        amount: '11000'
      }
    ]
  },
  {
    tokenID: '1as631cd08007k',
    name: 'DOCUEDU',
    symbol: 'DOE',
    availableBalance: '34000000',
    lockedBalances: [
      {
        moduleID: '4',
        amount: '12000'
      }
    ]
  },
];

export const FEES_BY_PRIORITIES_MOCK = {
  low: 100,
  medium: 320,
  high: 500
};

export const BROADCASTED_TRANSACTION_MOCK = {
  message: 'Transaction payload was successfully passed to the network node',
  transactionID: 'bfd3521aeddd586f43931b6972b5771e9919e18f2cc91e940a15eacb588ecc6c'
};
