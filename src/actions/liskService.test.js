import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import liskService from '../utilities/api/liskService';
import { pricesRetrieved } from './liskService';
import actionTypes from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions: liskService', () => {
  describe('pricesRetrieved', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      liskService.getPriceTicker = jest.fn();
    });

    it('should dispatch pricesRetrieved action with given data', async () => {
      const tickers = { LSK: {} };
      liskService.getPriceTicker.mockResolvedValue({ tickers });

      await store.dispatch(pricesRetrieved());

      expect(store.getActions()).toEqual([{
        type: actionTypes.pricesRetrieved,
        priceTicker: tickers.LSK,
      }]);
    });
  });
});
