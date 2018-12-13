import fetchMock from 'fetch-mock';
import liskService from './liskService';

describe('api/liskService', () => {
  describe('getPriceTicker method', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      const response = { tickers: {} };
      fetchMock.once('*', response);
      const result = await liskService.getPriceTicker();
      expect(result).toEqual(response);
    });

    it('handles non-500 errors', async () => {
      const response = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: response });

      try {
        await liskService.getPriceTicker();
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await liskService.getPriceTicker();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
