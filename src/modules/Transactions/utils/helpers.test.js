import { getMaxTransactionsNonce } from './helpers';

describe('Transaction module helpers', () => {
  describe('getMaxTransactionsNonce', () => {
    it('returns null for an empty array of transactions', () => {
      const transactions = [];
      const result = getMaxTransactionsNonce(transactions);
      expect(result).toBeNull();
    });

    it('returns the maximum nonce for an array of transactions', () => {
      const transactions = [{ nonce: '2' }, { nonce: '10' }, { nonce: '5' }, { nonce: '9' }];
      const result = getMaxTransactionsNonce(transactions);
      expect(result).toBe('10');
    });
  });
});
