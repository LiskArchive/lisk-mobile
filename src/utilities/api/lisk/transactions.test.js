import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';
import * as transactions from './transactions';

const data = [{
  id: '13746538517771550559',
  senderPublicKey: 'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
  senderId: '7056261880661230236L',
  recipientId: '4913610097661759129L',
  recipientPublicKey: 'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
  amount: '10000000000',
}];

describe('api/transactions', () => {
  beforeAll(() => {
    Lisk.transaction.transfer = jest.fn();
    LiskAPIClient.transactions.get = jest.fn();
    LiskAPIClient.transactions.broadcast = jest.fn();
  });

  it('calls transactions.get method correctly', () => {
    transactions.get({ id: data[0].id });
    expect(LiskAPIClient.transactions.get).toBeCalledWith({ id: data[0].id, sort: 'timestamp:desc' });
  });

  it('calls transactions.create method correctly', async () => {
    Lisk.transaction.transfer.mockReturnValue(data[0]);
    const tx = await transactions.create({ passphrase: 'test', recipientAddress: data[0].recipientId, amount: data[0].amount });
    expect(tx).toBe(data[0]);
  });

  it('calls transactions.broadcast method correctly', async () => {
    LiskAPIClient.transactions.broadcast.mockResolvedValueOnce(data[0]);
    const tx = await transactions.create({ passphrase: 'test', recipientAddress: data[0].recipientId, amount: data[0].amount });
    const result = await transactions.broadcast(tx);
    expect(result).toBe(data[0]);
  });

  it('handles rejections from transactions.broadcast method', async () => {
    const errorMessage = { message: 'Error!' };
    LiskAPIClient.transactions.broadcast.mockRejectedValueOnce(errorMessage);

    try {
      await transactions.broadcast(data[0]);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});
