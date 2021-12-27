import { apiClient } from './apiClient';
import * as transactions from './transactions';

jest.mock('./apiClient');

const response = {
  meta: { offset: 0, limit: 10, count: 2 },
  data: [
    {
      id: '10703320139793065364',
      height: 7450256,
      blockId: '9937261865542489722',
      type: 0,
      timestamp: 85447190,
      senderPublicKey: '84795ae68a1908d2a89daafce3f9980811ddf8f0c087c913ebe57759c977fbbc',
      recipientPublicKey: '04ffd6fb4508a5ca85355cc3b30dce326fe35781d32deb858879128cf8c141cc',
      amount: '1000000',
      fee: '10000000',
      signature:
        '08d2526bcd49299bb6894fb62a39b5d084c132cb593be674096aad8b273190922f24677def02817b424c7db1130f14799a0ffc4f95744980f2120c0f1376e200',
      signatures: [],
      confirmations: 99170,
      asset: {},
      senderId: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
      recipientId: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
      sender: {
        address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
      },
      recipient: {
        address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
      },
      block: {
        id: '381b0cc8ced666899b8113d3b4837cd3314bb440c5d84a6eba5f027992f9ac13',
        timestamp: 72473846,
        height: 15201096
      }
    },
    {
      id: '17545660133359630206',
      height: 7516990,
      blockId: '7795918980027524180',
      type: 0,
      timestamp: 86128728,
      senderPublicKey: '04ffd6fb4508a5ca85355cc3b30dce326fe35781d32deb858879128cf8c141cc',
      recipientPublicKey: '',
      amount: '10000000',
      fee: '10000000',
      signature:
        'b2eb00349cab3158076f29eab8f83250828ffafaee0439f3666236af9dff4d51949652cd155beb5f3d93a836b6f375e730de0f16fb4c659c7c67ed67b0849f0b',
      signatures: [],
      confirmations: 32436,
      asset: {
        data: 'test'
      },
      senderId: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
      recipientId: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
      sender: {
        address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
      },
      recipient: {
        address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
      },
      block: {
        id: '381b0cc8ced666899b8113d3b4837cd3314bb440c5d84a6eba5f027992f9ac13',
        timestamp: 72473846,
        height: 15101096
      }
    }
  ],
  links: {}
};

describe('api/transactions', () => {
  beforeAll(() => {
    apiClient.getTransactions = jest.fn();
    apiClient.getTransactions.mockResolvedValue(response.data);
    apiClient.sendTransaction = jest.fn();
    apiClient.getLatestBlock = jest.fn();
    apiClient.getLatestBlock.mockResolvedValue({
      height: 15301076,
      timestamp: 1640594580,
    });
  });

  describe('get', () => {
    it('should resolve correctly', async () => {
      const result = await transactions.get({
        address: response.data[0].recipient.address
      });
      expect(apiClient.getTransactions).toBeCalledWith(
        response.data[0].recipient.address,
        undefined,
        undefined
      );
      expect(result).toEqual({
        data: [
          {
            id: '10703320139793065364',
            senderAddress: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
            recipientAddress: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
            amount: 0,
            fee: '10000000',
            timestamp: 72473846,
            confirmations: 99981,
            nonce: undefined,
            type: undefined,
            moduleAssetId: undefined,
            moduleAssetName: undefined,
            blockHeight: 15201096,
            blockId: '381b0cc8ced666899b8113d3b4837cd3314bb440c5d84a6eba5f027992f9ac13',
            data: '',
            votes: [],
            delegate: ''
          },
          {
            id: '17545660133359630206',
            senderAddress: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
            recipientAddress: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
            amount: 0,
            fee: '10000000',
            timestamp: 72473846,
            confirmations: 199981,
            nonce: undefined,
            type: undefined,
            moduleAssetId: undefined,
            moduleAssetName: undefined,
            blockHeight: 15101096,
            blockId: '381b0cc8ced666899b8113d3b4837cd3314bb440c5d84a6eba5f027992f9ac13',
            data: '',
            votes: [],
            delegate: ''
          }
        ],
        meta: { limit: undefined, offset: undefined, count: 2 }
      });
    });

    it('Should handle rejections', async () => {
      const errorMessage = { message: 'Error!' };
      apiClient.getTransactions.mockRejectedValueOnce(errorMessage);

      try {
        await transactions.get({ address: response.data[0].recipientId });
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });

  it('Should call transactions.create method correctly', async () => {
    const tx = await transactions.create({
      nonce: '5',
      passphrase: 'test',
      recipientAddress: response.data[0].recipientId,
      amount: response.data[0].amount,
      fee: '100'
    });
    expect(tx).toMatchSnapshot();
  });

  it('Should call transactions.broadcast method correctly', async () => {
    apiClient.sendTransaction.mockResolvedValueOnce(response.data[0]);
    const tx = await transactions.create({
      nonce: '6',
      passphrase: 'test',
      recipientAddress: response.data[0].recipientId,
      amount: response.data[0].amount,
      fee: '100'
    });
    const result = await transactions.broadcast(tx);
    expect(result).toMatchSnapshot();
  });

  it('Should handle rejections from transactions.broadcast method', async () => {
    const errorMessage = { message: 'Error!' };
    apiClient.sendTransaction.mockRejectedValueOnce(errorMessage);

    try {
      await transactions.broadcast(response.data[0]);
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('Should get transaction detail for one transaction', () => {
  beforeAll(() => {
    apiClient.getTransaction = jest.fn();
    apiClient.getTransaction.mockResolvedValue([
      {
        ...response.data[0],
        moduleAssetId: '2:0',
        asset: {
          amount: '100000',
          recipient: {
            address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
          }
        }
      }
    ]);
  });

  it('Should call get transaction with id to get one transaction detail', async () => {
    await transactions.get({
      id: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
    });
    expect(apiClient.getTransaction).toBeCalledWith('lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw');
  });

  it('Should extract amount for transfer type', async () => {
    const result = await transactions.get({
      id: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
    });
    expect(result.data[0].amount).toEqual('100000');
  });
});

describe('Should get amount from unlock token transaction type', () => {
  beforeAll(() => {
    apiClient.getTransaction = jest.fn();
    apiClient.getLatestBlock = jest.fn();
    apiClient.getLatestBlock.mockResolvedValue({
      height: 15301076,
      timestamp: 1640594580,
    });
    apiClient.getTransaction.mockResolvedValue([
      {
        ...response.data[0],
        moduleAssetId: '5:2',
        asset: {
          amount: '100000',
          recipient: {
            address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
          },
          unlockObjects: [{ amount: 10 }, { amount: 11 }, { amount: 100 }, { amount: 98 }]
        }
      }
    ]);
  });

  it('should extract amount for unlock token type', async () => {
    const result = await transactions.get({
      id: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw'
    });
    expect(result.data[0].amount).toEqual('219');
  });
});
