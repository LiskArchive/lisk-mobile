export const TRANSACTIONS_MOCK = [
  {
    id: '83dfa359344caf59d88ff11834a9254922529094a014397e68eca20f33abf60b',
    moduleCommandID: '00000002:00000000',
    moduleCommandName: 'token:transfer',
    nonce: '1',
    fee: '100000000',
    sender: {
      address: 'lskezo8pcrbsoceuuu64rpc8w2qkont2ec3n772yu',
      publicKey: '97831829cd9a692935f1bea380bcde108e6dfb8a95a481b220b2709f2c3513c0'
    },
    params: {
      tokenID: '0000000000000000',
      amount: '100000000',
      recipientAddress: 'lskygwqgmgas25ghjzp4foyav5vob9qtzgf5fos3g',
      data: 'test transaction'
    },
    block: {
      id: '45d3d6b83e3bbae660b7f5a3b8ab6b5ddd6eb1595b781b7bcbc53efdd21bf03d',
      height: 230,
      timestamp: 1660650237
    },
    meta: {
      recipient: {
        address: 'lskygwqgmgas25ghjzp4foyav5vob9qtzgf5fos3g'
      }
    },
    confirmations: 182,
    executionStatus: null
  },
  {
    id: '552ee86ddbc26284569e707a3d8813c6c0c15af38c40d3e532d21cd4c4e9dd5f',
    moduleCommandID: '00000002:00000000',
    moduleCommandName: 'token:transfer',
    nonce: '0',
    fee: '100000000',
    sender: {
      address: 'lskezo8pcrbsoceuuu64rpc8w2qkont2ec3n772yu',
      publicKey: '97831829cd9a692935f1bea380bcde108e6dfb8a95a481b220b2709f2c3513c0'
    },
    params: {
      tokenID: '0000000000000000',
      amount: '1000000000',
      recipientAddress: 'lskygwqgmgas25ghjzp4foyav5vob9qtzgf5fos3g',
      data: 'test'
    },
    block: {
      id: 'f0551554e2fce5c8bf1be7de9469ae6f8c1c2dd41dfe155f6aa50dcb85bb0ba7',
      height: 221,
      timestamp: 1660650147
    },
    meta: {
      recipient: {
        address: 'lskygwqgmgas25ghjzp4foyav5vob9qtzgf5fos3g'
      }
    },
    confirmations: 191,
    executionStatus: null
  }
];

export const GET_TRANSACTIONS_QUERY_MOCK = {
  data: TRANSACTIONS_MOCK,
  meta: {
    count: 2,
    offset: 0,
    total: TRANSACTIONS_MOCK.length,
  },
};
