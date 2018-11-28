import settingsMiddleware from './settings';
import actionTypes from '../../constants/actions';
import * as storageUtility from '../../utilities/storage';

describe('Middleware: Settings', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      settings: {},
    }),
  };

  it('should pass the action', () => {
    const action = {
      type: 'ANY_OTHER_ACTION',
    };

    settingsMiddleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
  });

  it('should store new settings', () => {
    const action = {
      type: actionTypes.settingsUpdated,
      data: {
        test: true,
      },
    };

    storageUtility.storeSettings = jest.fn();
    settingsMiddleware(store)(next)(action);
    const { settings } = store.getState();
    expect(storageUtility.storeSettings).toBeCalledWith(settings);
  });
});
