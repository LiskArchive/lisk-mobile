import liskService, { INITIAL_STATE } from './liskService';
import actionTypes from '../../constants/actions';

describe('reducers: liskService', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('should create the empty state initially', () => {
    const createdState = liskService();
    expect(createdState).toEqual(INITIAL_STATE);
  });

  it('should return updated state in case of actionTypes.pricesRetrieved', () => {
    const action = {
      type: actionTypes.pricesRetrieved,
      priceTicker: { USD: 1, EUR: 1 },
    };

    expect(liskService(state, action)).toEqual({
      priceTicker: action.priceTicker,
    });
  });
});
