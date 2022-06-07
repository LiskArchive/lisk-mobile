import { tokenKeys } from 'constants/tokens';
import actionTypes from '../actionTypes';
import settings, { INITIAL_STATE } from './settings';

const defaultTokens = {
  active: 'LSK',
  list: {
    LSK: true,
    BTC: true,
  },
};

const disabledBTC = {
  active: 'LSK',
  list: {
    LSK: true,
    BTC: false,
  },
};

const enabledBTC = {
  active: 'BTC',
  list: {
    LSK: true,
    BTC: true,
  },
};

const invalidBTCActivationAttempt = {
  active: 'BTC',
  list: {
    LSK: true,
    BTC: false,
  },
};

describe('Reducers: Settings', () => {
  it('should create the empty state initially', () => {
    const createdState = settings();
    expect(createdState).toEqual(INITIAL_STATE);
  });

  describe('settingsUpdated', () => {
    it('should return updated state', () => {
      const state = {
        token: defaultTokens,
      };
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          sensorType: 'Face ID',
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        sensorType: 'Face ID',
        token: defaultTokens,
      });
    });

    it('should revert to LSK when disabling the active token', () => {
      const state = {
        token: defaultTokens,
      };
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          token: invalidBTCActivationAttempt,
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        token: disabledBTC,
      });
    });

    it('should revert to LSK if the activated token is already disabled', () => {
      const state = {
        token: disabledBTC,
      };
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          token: invalidBTCActivationAttempt,
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        token: disabledBTC,
      });
    });

    it('should change the active token to LSK if disables that token', () => {
      const state = {
        token: enabledBTC,
      };
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          token: invalidBTCActivationAttempt,
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        token: disabledBTC,
      });
    });

    it('should change the active token if a new one is passed', () => {
      const state = {
        token: defaultTokens,
      };
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          token: enabledBTC,
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        token: enabledBTC,
      });
    });

    it('should change the active token if a active token and list are correctly passed', () => {
      const state = {
        token: disabledBTC,
      };
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          token: enabledBTC,
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        token: enabledBTC,
      });
    });
  });

  describe('settingsRetrieved', () => {
    it('should store the retrieved settings', () => {
      const action = {
        type: actionTypes.settingsRetrieved,
        data: {
          sensorType: 'Face ID',
          token: defaultTokens,
        },
      };
      const state = {};

      const changedState = settings(state, action);
      expect(changedState).toEqual({
        currency: 'EUR',
        sensorType: 'Face ID',
        token: defaultTokens,
      });
    });
    it('should fallback active token to LSK and currency to EUR', () => {
      const action = {
        type: actionTypes.settingsRetrieved,
        data: {
          token: {
            active: tokenKeys[1]
          }
        },
      };
      const state = {};

      const changedState = settings(state, action);
      expect(changedState).toEqual({
        currency: 'EUR',
        token: {
          active: tokenKeys[0]
        }
      });
    });
  });
});
