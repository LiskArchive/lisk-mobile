import fetchMock from 'fetch-mock';
import { getSummary, extractAddress } from './account';

const data = {
  passphrase: 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together',
  address: '13myAau1kxz8HKPhbe3psnpahbgozPi6Az',
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
        [data.address]: {
          final_balance: 1000,
        },
      };

      fetchMock.once('*', response);
      const result = await getSummary(data.address);
      expect(result).toEqual({
        address: data.address,
        balance: response[data.address].final_balance,
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
});
