import fetchMock from 'fetch-mock';
import * as service from './service';

const response = {
  getPriceTicker: {
    success: true,
    data: [
      {
        from: 'LSK',
        to: 'USD',
        rate: '1.236665476',
      },
      {
        from: 'LSK',
        to: 'EUR',
        rate: '0.0629581058',
      },
      {
        from: 'LSK',
        to: 'CHF',
        rate: '0.7833845341',
      },
      {
        from: 'BTC',
        to: 'USD',
        rate: '4010.2',
      },
      {
        from: 'BTC',
        to: 'EUR',
        rate: '3446.91',
      },
      {
        from: 'BTC',
        to: 'CHF',
        rate: '8159.81825053',
      },
    ],
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
        USD: String(response.getPriceTicker.data[3].rate),
        EUR: String(response.getPriceTicker.data[4].rate),
        CHF: String(response.getPriceTicker.data[5].rate),
      });
    });

    it('handles non-500 errors', async () => {
      fetchMock.once('*', { status: 400 });

      try {
        await service.getPriceTicker();
      } catch (error) {
        expect(error).toMatchSnapshot();
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
