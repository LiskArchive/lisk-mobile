import actionTypes from '../../constants/actions';
import { storeSettings } from '../../utilities/storage';

const accountsMiddleware = store => next => (action) => {
  next(action);
  const { settings } = store.getState();

  switch (action.type) {
    case actionTypes.settingsUpdated:
      storeSettings(settings);
      break;
    default: break;
  }
};

export default accountsMiddleware;
