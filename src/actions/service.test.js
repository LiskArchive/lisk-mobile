import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as liskService from '../utilities/api/lisk/service';
import { pricesRetrieved } from './service';
import actionTypes from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions: service', () => {
  describe('pricesRetrieved', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      liskService.getPriceTicker = jest.fn();
    });

    it('should dispatch pricesRetrieved action with given data', async () => {
      const tickers = { EUR: 1, USD: 1 };
      liskService.getPriceTicker.mockResolvedValue(tickers);

      await store.dispatch(pricesRetrieved());

      expect(store.getActions()).toEqual([{
        type: actionTypes.pricesRetrieved,
        priceTicker: tickers,
      }]);
    });
  });
});
