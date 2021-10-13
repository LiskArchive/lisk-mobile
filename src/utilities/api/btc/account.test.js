import fetchMock from 'fetch-mock';
import {
  getSummary,
  extractAddress,
  getDerivedPathFromPassphrase,
  extractPublicKey,
} from './account';

const data = {
  passphrase:
    'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together',
  address: '1PA2gjCNsjsNEMSfAk6QhY8SEEs1GsPRk6',
};

describe('api/btc/account', () => {
  describe('extractAddress', () => {
    it('extracts address from passphrase', () => {
      expect(extractAddress(data.passphrase)).toBe(data.address);
    });
  });

  describe('getSummary', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      const response = {
        data: {
          confirmed_balance: 1000,
        },
      };

      fetchMock.once('*', response);
      const result = await getSummary({ address: data.address });
      expect(result).toEqual({
        address: data.address,
        balance: response.data.confirmed_balance,
        initialized: true,
      });
    });

    it('handles non-500 errors', async () => {
      const response = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: response });

      try {
        await getSummary(data.address);
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await getSummary(data.address);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('getDerivedPathFromPassphrase', () => {
    it('should return derivedPath object', () => {
      const result = getDerivedPathFromPassphrase(data.passphrase);
      const keys = Object.keys(result);
      expect(keys).toContain('network');
      expect(keys).toContain('chainCode');
      expect(keys).toContain('lowR');
      expect(Buffer.isBuffer(result.publicKey)).toEqual(true);
    });
  });

  describe('extractPublicKey', () => {
    it('should return a valid public key', () => {
      const publicKey = extractPublicKey(data.passphrase);
      expect(Buffer.isBuffer(publicKey)).toEqual(true);
    });
  });
});
