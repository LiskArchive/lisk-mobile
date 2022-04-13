import actionTypes from 'constants/actions';
import { storeSettings } from 'utilities/storage';
import { deviceLocale } from 'utilities/device';
import i18n from '../../../locales';
// import { languageKeys } from 'constants/languages';
import { pricesRetrieved } from '../../actions/service';

const settingsMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.settingsRetrieved:
      if (!action.data.language) {
        action.data.language = deviceLocale();
      }

      // if (
      //   action.data.language !== 'en' &&
      //   languageKeys.includes(action.data.language)
      // ) {
      //   i18n.changeLanguage(action.data.language);
      // } else {
      //   action.data.language = 'en';
      // }
      action.data.language = 'en';

      // if (!action.data.theme) {
      //   action.data.theme = deviceTheme();
      // }

      next(action);
      break;
    case actionTypes.settingsUpdated:
      next(action);
      if (action.data.token) {
        store.dispatch(pricesRetrieved());
      }
      storeSettings(store.getState().settings);

      if (action.data.language) {
        i18n.changeLanguage(action.data.language);
      }
      // action.data.theme = deviceTheme();
      break;
    default:
      next(action);
      break;
  }
};

export default settingsMiddleware;
