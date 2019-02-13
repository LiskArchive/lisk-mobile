import fetchMock from 'fetch-mock';
import { getSummary, extractAddress } from './account';

const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';
const account = {
  address: '13myAau1kxz8HKPhbe3psnpahbgozPi6Az',
};

describe('api/btc/account', () => {
  describe('extractAddress', () => {
    it('extracts address from passphrase', () => {
      expect(extractAddress(passphrase)).toBe(account.address);
    });
  });

  describe('getSummary', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      const response = {
        [account.address]: {
          final_balance: 1000,
        },
      };

      fetchMock.once('*', response);
      const result = await getSummary(account.address);
      expect(result).toEqual({
        address: account.address,
        balance: response[account.address].final_balance,
        initialized: true,
      });
    });

    it('handles non-500 errors', async () => {
      const response = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: response });

      try {
        await getSummary(account.address);
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await getSummary(account.address);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
