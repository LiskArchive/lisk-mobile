import network from './network';
import actionTypes from '../../constants/actions';

const initialState = { height: 0, blockTime: 0 };
describe('Reducers: Loading', () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it('should create the empty state initially', () => {
    const createdState = network();
    const emptyState = initialState;
    expect(createdState).toEqual(emptyState);
  });

  it('should return height and blockTime if action.type = actionTypes.networkInfoUpdated', () => {
    const action = {
      type: actionTypes.networkInfoUpdated,
      data: { height: 100, blockTime: 500 },
    };
    const changedState = network(state, action);
    expect(changedState).toEqual({ ...state, ...action.data });
  });

  it('should return initial state if action.type !== actionTypes.networkInfoUpdated', () => {
    const action = {
      type: actionTypes.undefinedAction,
      data: { height: 100, blockTime: 500 },
    };
    const changedState = network(state, action);
    expect(changedState).toEqual(initialState);
  });
});
