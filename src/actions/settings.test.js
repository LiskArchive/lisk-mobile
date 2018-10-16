import actionTypes from '../constants/actions';
import {
  settingsUpdated,
} from './settings';


describe('actions: settings', () => {
  describe('settingsUpdated', () => {
    it('should update the settings with the given data', () => {
      const data = { sensorType: 'Face ID' };

      const expectedAction = {
        data,
        type: actionTypes.settingsUpdated,
      };
      expect(settingsUpdated(data)).toEqual(expectedAction);
    });
  });
});
