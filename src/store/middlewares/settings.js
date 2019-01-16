import { NativeModules } from 'react-native';
import actionTypes from '../../constants/actions';
import { storeSettings } from '../../utilities/storage';

const deviceLocale = NativeModules.SettingsManager.settings.AppleLocale;

const settingsMiddleware = store => next => (action) => {
  const { settings } = store.getState();

  switch (action.type) {
    case actionTypes.settingsRetrieved:
      if (!settings.locale) {
        action.data.locale = deviceLocale;
      }
      next(action);
      break;
    case actionTypes.settingsUpdated:
      next(action);
      storeSettings(store.getState().settings);
      break;
    default:
      next(action);
      break;
  }
};

export default settingsMiddleware;
