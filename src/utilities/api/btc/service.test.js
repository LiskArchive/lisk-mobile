import fetchMock from 'fetch-mock';
import * as service from './service';

const response = {
  getPriceTicker: {
    success: true,
    tickers: {
      LSK: {
        BTC: '0.00030838',
        GBP: 0.9203830854540899,
        EUR: 1.0629581058,
        USD: 1.236665476,
        PLN: 4.600412840000001,
        RUB: 78.17433000000001,
        JPY: 133.30835668,
        CNY: 13.638946716302977,
        CHF: 0.7833845341,
      },
      BTC: {
        GBP: '2984.57450371',
        EUR: '3446.91',
        USD: '4010.2',
        PLN: 14918,
        RUB: '253500',
        JPY: 432286,
        CNY: 44227.727856226,
        CHF: 8159.81825053,
      },
    },
  },
  getDynamicFees: {
    hourFee: 20,
    halfHourFee: 40,
    fastestFee: 80,
  },
};

describe('api/btc/service', () => {
  describe('getPriceTicker', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      fetchMock.once('*', response.getPriceTicker);
      const result = await service.getPriceTicker();
      expect(result).toEqual({
        USD: String(response.getPriceTicker.tickers.BTC.USD),
        EUR: String(response.getPriceTicker.tickers.BTC.EUR),
        CHF: String(response.getPriceTicker.tickers.BTC.CHF),
      });
    });

    it('handles non-500 errors', async () => {
      const errorResponse = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: errorResponse });

      try {
        await service.getPriceTicker();
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await service.getPriceTicker();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('getDynamicFees', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      fetchMock.once('*', response.getDynamicFees);
      const result = await service.getDynamicFees();
      expect(result).toEqual({
        Low: 20,
        Medium: 40,
        High: 80,
      });
    });

    it('handles non-500 errors', async () => {
      const errorResponse = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: errorResponse });

      try {
        await service.getDynamicFees();
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await service.getDynamicFees();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
