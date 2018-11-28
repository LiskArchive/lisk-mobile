import { getTransactions, send } from './transactions';

const activePeer = {
  transactions: {
    get: jest.fn(),
    broadcast: jest.fn(),
  },
};

describe('api/transactions', () => {
  const transactions = [{
    id: '13746538517771550559',
    height: 6174907,
    blockId: '10687269197653491500',
    type: 0,
    timestamp: 72473846,
    senderPublicKey: 'b550ede5ee0373d2930525016a45aadb50ab6f776068eef3874fa813a26c78d8',
    senderId: '7056261880661230236L',
    recipientId: '4913610097661759129L',
    recipientPublicKey: 'f6399b0251eb0e175e55fac0d6bd53f091c732931dbd816b4bfc42b158d5f04f',
    amount: '10000000000',
    fee: '10000000',
    signature: '30ab885c21e2182d42d5f88ec2ed87dbbaab2a47ac1ccb22d6dc1013dd6c6abc9f9d1d867b554ec3486e70760d544e5948e3040f6ae33bb125ffd3dceedd1901',
    signatures: [],
    confirmations: 15227,
    asset: {
      data: 'manu',
    },
  }];

  it('calls activePeer.transactions.get method correctly', () => {
    getTransactions(activePeer, { offset: 0 });
    expect(activePeer.transactions.get).toBeCalledWith({ offset: 0, sort: 'timestamp:desc' });
  });

  it('calls activePeers.transactions.broadcast method correctly', async () => {
    activePeer.transactions.broadcast.mockResolvedValueOnce(transactions[0]);
    await send(activePeer, transactions[0]);
    expect(activePeer.transactions.broadcast).toBeCalled();
  });

  it('handles rejections from activePeers.transactions.broadcast method', async () => {
    const errorMessage = { message: 'Error!' };
    activePeer.transactions.broadcast.mockRejectedValueOnce(errorMessage);

    try {
      await send(activePeer, transactions[0]);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});
