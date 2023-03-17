import { getMaxTransactionsNonce } from './helpers';

describe('Transaction module helpers', () => {
  describe('getMaxTransactionsNonce', () => {
    it('returns 0 for an empty array', () => {
      const transactions = [];
      const result = getMaxTransactionsNonce(transactions);
      expect(result).toBe(0);
    });

    it('returns the maximum nonce for an array of transactions', () => {
      const transactions = [{ nonce: '0.1' }, { nonce: '1.5' }, { nonce: '2.2' }, { nonce: '1.9' }];
      const result = getMaxTransactionsNonce(transactions);
      expect(result).toBe(2.2);
    });

    it('returns the nonce as a number, not a string', () => {
      const transactions = [{ nonce: '3.7' }];
      const result = getMaxTransactionsNonce(transactions);
      expect(typeof result).toBe('number');
      expect(result).toBe(3.7);
    });
  });
});
