import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';
import * as transactions from './transactions';

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
      senderId: '15053209190342141388L',
      recipientId: '259246364220575157L',
      recipientPublicKey: '04ffd6fb4508a5ca85355cc3b30dce326fe35781d32deb858879128cf8c141cc',
      amount: '1000000',
      fee: '10000000',
      signature: '08d2526bcd49299bb6894fb62a39b5d084c132cb593be674096aad8b273190922f24677def02817b424c7db1130f14799a0ffc4f95744980f2120c0f1376e200',
      signatures: [],
      confirmations: 99170,
      asset: {},
    }, {
      id: '17545660133359630206',
      height: 7516990,
      blockId: '7795918980027524180',
      type: 0,
      timestamp: 86128728,
      senderPublicKey: '04ffd6fb4508a5ca85355cc3b30dce326fe35781d32deb858879128cf8c141cc',
      senderId: '259246364220575157L',
      recipientId: '1L',
      recipientPublicKey: '',
      amount: '10000000',
      fee: '10000000',
      signature: 'b2eb00349cab3158076f29eab8f83250828ffafaee0439f3666236af9dff4d51949652cd155beb5f3d93a836b6f375e730de0f16fb4c659c7c67ed67b0849f0b',
      signatures: [],
      confirmations: 32436,
      asset: {
        data: 'test',
      },
    },
  ],
  links: {},
};

describe('api/transactions', () => {
  beforeAll(() => {
    Lisk.transaction.transfer = jest.fn();
    LiskAPIClient.transactions.get = jest.fn();
    LiskAPIClient.transactions.broadcast = jest.fn();
  });

  describe('get', () => {
    it('resolves correctly', async () => {
      LiskAPIClient.transactions.get.mockResolvedValueOnce(response);
      const result = await transactions.get({ address: response.data[0].recipientId });
      expect(LiskAPIClient.transactions.get).toBeCalledWith({ senderIdOrRecipientId: response.data[0].recipientId, sort: 'timestamp:desc' });
      expect(result).toEqual({
        data: [
          {
            id: '10703320139793065364',
            senderAddress: '15053209190342141388L',
            recipientAddress: '259246364220575157L',
            timestamp: 85447190,
            confirmations: 99170,
            amount: '1000000',
            fee: '10000000',
            extra: {
              type: 0,
              data: '',
            },
          },
          {
            id: '17545660133359630206',
            senderAddress: '259246364220575157L',
            recipientAddress: '1L',
            timestamp: 86128728,
            confirmations: 32436,
            amount: '10000000',
            fee: '10000000',
            extra: {
              type: 0,
              data: 'test',
            },
          },
        ],
        meta: response.meta,
      });
    });

    it('handles rejections', async () => {
      const errorMessage = { message: 'Error!' };
      LiskAPIClient.transactions.get.mockRejectedValueOnce(errorMessage);

      try {
        await transactions.get({ address: response.data[0].recipientId });
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });

  it('calls transactions.create method correctly', async () => {
    Lisk.transaction.transfer.mockReturnValue(response.data[0]);
    const tx = await transactions.create({ passphrase: 'test', recipientAddress: response.data[0].recipientId, amount: response.data[0].amount });
    expect(tx).toBe(response.data[0]);
  });

  it('calls transactions.broadcast method correctly', async () => {
    LiskAPIClient.transactions.broadcast.mockResolvedValueOnce(response.data[0]);
    const tx = await transactions.create({ passphrase: 'test', recipientAddress: response.data[0].recipientId, amount: response.data[0].amount });
    const result = await transactions.broadcast(tx);
    expect(result).toBe(response.data[0]);
  });

  it('handles rejections from transactions.broadcast method', async () => {
    const errorMessage = { message: 'Error!' };
    LiskAPIClient.transactions.broadcast.mockRejectedValueOnce(errorMessage);

    try {
      await transactions.broadcast(response.data[0]);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});
