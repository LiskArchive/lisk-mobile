import { NativeModules } from 'react-native';
import actionTypes from '../../constants/actions';
import { storeSettings } from '../../utilities/storage';
import i18n from '../../../locales';

const deviceLocale = NativeModules.SettingsManager.settings.AppleLocale;

const settingsMiddleware = store => next => (action) => {
  switch (action.type) {
    case actionTypes.settingsRetrieved:
      if (!action.data.language) {
        action.data.language = deviceLocale.substr(0, 2);
      }

      if (action.data.language !== 'en') {
        i18n.changeLanguage(action.data.language);
      }
      next(action);
      break;
    case actionTypes.settingsUpdated:
      next(action);
      storeSettings(store.getState().settings);

      if (action.data.language) {
        i18n.changeLanguage(action.data.language);
      }
      break;
    default:
      next(action);
      break;
  }
};

export default settingsMiddleware;
