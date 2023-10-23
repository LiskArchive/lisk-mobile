import app from 'constants/app';
import actionTypes from '../actionTypes';
import { INITIAL_STATE, settings } from './settings';

describe('Reducers: Settings', () => {
  it('should create the empty state initially', () => {
    const createdState = settings();
    expect(createdState).toEqual(INITIAL_STATE);
  });

  describe('settingsUpdated', () => {
    it('should return updated state', () => {
      const state = {};
      const action = {
        type: actionTypes.settingsUpdated,
        data: {
          sensorType: app.faceId,
        },
      };
      const changedState = settings(state, action);
      expect(changedState).toEqual({
        sensorType: app.faceId,
      });
    });
  });

  describe('settingsRetrieved', () => {
    it('should store the retrieved settings', () => {
      const action = {
        type: actionTypes.settingsRetrieved,
        data: {
          sensorType: app.faceId,
        },
      };
      const state = {};

      const changedState = settings(state, action);
      expect(changedState).toEqual({
        currency: 'EUR',
        sensorType: app.faceId,
      });
    });
  });
});
