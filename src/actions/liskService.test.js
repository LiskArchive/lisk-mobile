import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import liskService from '../utilities/api/liskService';
import { getPriceTicker } from './liskService';
import actionTypes from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions: liskService', () => {
  describe('getPriceTicker', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      liskService.getPriceTicker = jest.fn();
    });

    it('should dispatch priceTickerLoaded action with given data', async () => {
      const tickers = { LSK: {} };
      liskService.getPriceTicker.mockResolvedValue({ tickers });

      await store.dispatch(getPriceTicker());

      expect(store.getActions()).toEqual([{
        type: actionTypes.priceTickerLoaded,
        priceTicker: tickers.LSK,
      }]);
    });

    it('should dispatch priceTickerFailed action with given error', async () => {
      const error = { message: 'test' };
      liskService.getPriceTicker.mockRejectedValue(error);

      await store.dispatch(getPriceTicker());

      expect(store.getActions()).toEqual([{
        type: actionTypes.priceTickerFailed,
        error,
      }]);
    });
  });
});
