import actionTypes from '../constants/actions';
import {
  loadingStarted,
  loadingFinished,
} from './loading';


describe('actions: loading', () => {
  describe('loadingStarted', () => {
    it('should create an action to show loading bar', () => {
      const data = 'test';

      const expectedAction = {
        data,
        type: actionTypes.loadingStarted,
      };
      expect(loadingStarted(data)).toEqual(expectedAction);
    });
  });

  describe('loadingFinished', () => {
    it('should create an action to hide loading bar', () => {
      const data = 'test';

      const expectedAction = {
        data,
        type: actionTypes.loadingFinished,
      };
      expect(loadingFinished(data)).toEqual(expectedAction);
    });
  });
});
