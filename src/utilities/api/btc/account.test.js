import fetchMock from 'fetch-mock';
import { getAccount } from './account';

const ADDRESS = '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC';

describe('api/btc/account', () => {
  describe('getAccount method', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      const response = {
        [ADDRESS]: {
          final_balance: 1000,
        },
      };

      fetchMock.once('*', response);
      const result = await getAccount(ADDRESS);
      expect(result).toEqual({
        address: ADDRESS,
        balance: response[ADDRESS].final_balance,
      });
    });

    it('handles non-500 errors', async () => {
      const response = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: response });

      try {
        await getAccount(ADDRESS);
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await getAccount(ADDRESS);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
