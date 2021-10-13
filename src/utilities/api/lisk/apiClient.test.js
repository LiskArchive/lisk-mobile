import { apiClient } from './apiClient';

const account = {
  address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
  balance: '10000',
  publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
  unconfirmedBalance: '10000',
  initialized: true
};

describe('apiClient', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccount', () => {
    it('Retrieve accounts by address', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: true,
        status: 200,
        json: () => ({
          data: [{
            sequence: { nonce: 0 },
            summary: account,
          }],
        })
      }));
      const result = await apiClient.getAccount(account.address);
      expect(result).toEqual({ ...account, nonce: 0 });
    });

    it('Return an empty account in case of 404', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 404,
      }));
      const result = await apiClient.getAccount(account.address);
      expect(result).toEqual({
        address: account.address,
        balance: 0,
        nonce: 0,
        initialized: true,
      });
    });

    it('Throw error for all other errors', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 500,
      }));
      try {
        await apiClient.getAccount(account.address);
      } catch (e) {
        expect(e.message).toEqual('Failed to request account from server.');
      }
    });
  });

  describe('getTransaction', () => {
    const tx = {
      id: 'sample_id',
      amount: 1,
    };

    it('Retrieve a transaction by id', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: true,
        status: 200,
        json: () => ({
          data: {
            id: 'sample_id',
            amount: 1,
          },
        })
      }));
      const result = await apiClient.getTransaction(tx.id);
      expect(result).toEqual(tx);
      expect(fetch).toHaveBeenCalledWith(
        `https://service.lisk.com/api/v2/transactions?transactionId=${tx.id}`,
        expect.anything(),
      );
    });

    it('Return an empty account in case of 404', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 404,
      }));
      const result = await apiClient.getTransaction(tx.id);
      expect(result).toEqual([]);
    });

    it('Throw error for all other errors', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 500,
      }));
      try {
        await apiClient.getTransaction(tx.id);
      } catch (e) {
        expect(e.message).toEqual('Failed to request transactions from server.');
      }
    });
  });

  describe('getTransactions', () => {
    const txList = [{
      id: 'sample_id',
      amount: 1,
    }];

    it('Retrieve a list of transaction for given address', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: true,
        status: 200,
        json: () => ({ data: txList })
      }));
      const result = await apiClient.getTransactions(account.address);
      expect(result).toEqual(txList);
      expect(fetch).toHaveBeenCalledWith(
        `https://service.lisk.com/api/v2/transactions?address=${account.address}&limit=10&offset=0&includePending=false&sort=timestamp:desc`,
        expect.anything(),
      );
    });

    it('Return an empty account in case of 404', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 404,
      }));
      const result = await apiClient.getTransactions(account.address);
      expect(result).toEqual([]);
    });

    it('Throw error for all other errors', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 500,
      }));
      try {
        await apiClient.getTransactions(account.address);
      } catch (e) {
        expect(e.message).toEqual('Failed to request transactions from server.');
      }
    });
  });

  describe('getFees', () => {
    const fees = {
      USD: 1,
    };

    it('Retrieves the latest fees', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: true,
        status: 200,
        json: () => ({ data: fees })
      }));
      const result = await apiClient.getFees();
      expect(result).toEqual(fees);
      expect(fetch).toHaveBeenCalledWith(
        'https://service.lisk.com/api/v2/fees',
        expect.anything(),
      );
    });

    it('Throw error for all other errors', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 500,
      }));
      try {
        await apiClient.getFees();
      } catch (e) {
        expect(e.message).toEqual('Failed to request fees from server.');
      }
    });
  });

  describe('sendTransaction', () => {
    const tx = {
      id: 1,
    };

    it('be able to send transactions', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: true,
        status: 200,
        json: () => ({ data: tx })
      }));
      await apiClient.sendTransaction(tx);
      expect(fetch).toHaveBeenCalledWith(
        'https://service.lisk.com/api/v2/transactions',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(tx),
        })
      );
    });

    it('Throw error is the tx fails', async () => {
      global.fetch.mockReturnValue(Promise.resolve({
        ok: false,
        status: 500,
      }));
      try {
        await apiClient.sendTransaction();
      } catch (e) {
        expect(e.message).toEqual('Failed to send transactions to server.');
      }
    });
  });
});
