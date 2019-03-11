import settings, { INITIAL_STATE } from './settings';
import actionTypes from '../../constants/actions';

describe('Reducers: Settings', () => {
  it('should create the empty state initially', () => {
    const createdState = settings();
    expect(createdState).toEqual(INITIAL_STATE);
  });

  describe('settingsUpdated', () => {
    let state;
    beforeEach(() => {
      state = {};
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

  describe('settingsRetrieved', () => {
    it('should should always start with LSK in case of actionTypes.settingsRetrieved', () => {
      const action = {
        type: actionTypes.settingsRetrieved,
        data: {
          token: {
            active: 'BTC',
            list: ['LSK', 'BTC'],
          },
        },
      };
      const state = {};

      const changedState = settings(state, action);
      expect(changedState.token.active).toEqual('LSK');
    });
  });
});
