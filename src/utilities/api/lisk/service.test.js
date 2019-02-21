import fetchMock from 'fetch-mock';
import { getPriceTicker } from './service';

describe('api/lisk/service', () => {
  describe('getPriceTicker method', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      const response = { tickers: { LSK: { EUR: 1 } } };
      fetchMock.once('*', response);
      const result = await getPriceTicker();
      expect(result).toEqual(response.tickers.LSK);
    });

    it('handles non-500 errors', async () => {
      const response = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: response });

      try {
        await getPriceTicker();
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await getPriceTicker();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
