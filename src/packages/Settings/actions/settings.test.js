import * as storageUtility from 'utilities/storage';
import { settingsUpdated, settingsRetrieved } from './settings';
import actionTypes from '../actionTypes';

const settings = {
  sensorType: 'Face ID',
};

const store = {
  dispatch: jest.fn(),
};

describe('actions: settings', () => {
  describe('settingsUpdated', () => {
    it('should update the settings with the given data', () => {
      const expectedAction = {
        data: settings,
        type: actionTypes.settingsUpdated,
      };
      expect(settingsUpdated(settings)).toEqual(expectedAction);
    });
  });

  describe('settingsRetrieved', () => {
    beforeEach(() => {
      storageUtility.getSettings = jest.fn();
    });

    it('should retrieve settings from storage and dispatch action', async () => {
      const expectedAction = {
        data: settings,
        type: actionTypes.settingsRetrieved,
      };
      storageUtility.getSettings.mockResolvedValue(settings);
      await settingsRetrieved()(store.dispatch);
      expect(store.dispatch).toBeCalledWith(expectedAction);
    });
  });
});
