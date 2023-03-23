import { computeNonce } from './helpers';

describe('Transaction module helpers', () => {
  describe('computeNonce', () => {
    it('returns the authNonce if transactionPool is empty', () => {
      const authNonce = '123456';
      const transactionPool = [];
      const result = computeNonce(authNonce, transactionPool);
      expect(result).toEqual(authNonce);
    });

    it('returns the maximum nonce from the transactionPool', () => {
      const authNonce = '123456';
      const transactionPool = [{ nonce: '123450' }, { nonce: '123454' }, { nonce: '123455' }];
      const result = computeNonce(authNonce, transactionPool);
      expect(result).toEqual('123455');
    });
  });
});
