import peers from './peers';
import actionTypes from '../../constants/actions';


describe('Reducers: Peers', () => {
  let state;

  it('should create the empty state initially', () => {
    const createdState = peers();
    const emptyState = { activePeer: null };
    expect(createdState).toEqual(emptyState);
  });

  it('should set the given data in activePeer in cases of activePeerSet', () => {
    const action = {
      type: actionTypes.activePeerSet,
      data: { test: 'test' },
    };
    const changedState = peers(state, action);
    expect(changedState).toEqual({ activePeer: action.data });
  });

  it('should set the given data in activePeer in cases of activePeerUpdated', () => {
    const currentState = {
      activePeer: { test: 'test' },
    };
    const action = {
      type: actionTypes.activePeerUpdated,
      data: { test: 'changed' },
    };
    const changedState = peers(currentState, action);
    expect(changedState).toEqual({ activePeer: action.data });
  });
});

