import settings, { INITIAL_STATE } from './settings';
import actionTypes from '../../constants/actions';

describe('Reducers: Settings', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('should create the empty state initially', () => {
    const createdState = settings();
    expect(createdState).toEqual(INITIAL_STATE);
  });

  it('should return updated state in case of actionTypes.settingsUpdated', () => {
    const action = {
      type: actionTypes.settingsUpdated,
      data: {
        sensorType: 'Face ID',
      },
    };
    const changedState = settings(state, action);
    expect(changedState).toEqual({
      sensorType: 'Face ID',
    });
  });
});
