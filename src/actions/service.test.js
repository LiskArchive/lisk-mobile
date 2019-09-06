import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actionTypes from '../constants/actions';
import { service as serviceAPI } from '../utilities/api';
import { pricesRetrieved, dynamicFeesRetrieved } from './service';
import { INITIAL_STATE as settings } from '../store/reducers/settings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions: service', () => {
  beforeAll(() => {
    serviceAPI.getPriceTicker = jest.fn();
    serviceAPI.getDynamicFees = jest.fn();
  });

  let store;

  beforeEach(() => {
    store = mockStore({ settings });
  });

  describe('pricesRetrieved', () => {
    it('should dispatch pricesRetrieved action with given data', async () => {
      const tickers = { EUR: 1, USD: 1 };
      serviceAPI.getPriceTicker.mockResolvedValueOnce(tickers);

      await store.dispatch(pricesRetrieved());

      expect(store.getActions()).toEqual([
        {
          type: actionTypes.pricesRetrieved,
          data: {
            priceTicker: tickers,
            activeToken: settings.token.active,
          },
        },
      ]);
    });

    it('should handle rejections', async () => {
      serviceAPI.getPriceTicker.mockRejectedValueOnce('Error');
      await store.dispatch(pricesRetrieved());
      expect(store.getActions()).toEqual([]);
    });
  });

  describe('dynamicFeesRetrieved', () => {
    it('should dispatch dynamicFeesRetrieved action with given data', async () => {
      const fees = { low: 1, medium: 5, high: 20 };
      serviceAPI.getDynamicFees.mockResolvedValueOnce(fees);

      await store.dispatch(dynamicFeesRetrieved());

      expect(store.getActions()).toEqual([
        {
          type: actionTypes.dynamicFeesRetrieved,
          dynamicFees: fees,
        },
      ]);
    });

    it('should handle rejections', async () => {
      serviceAPI.getDynamicFees.mockRejectedValueOnce('Error');
      await store.dispatch(dynamicFeesRetrieved());
      expect(store.getActions()).toEqual([]);
    });
  });
});
