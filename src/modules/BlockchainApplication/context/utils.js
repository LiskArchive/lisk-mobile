import AsyncStorage from '@react-native-async-storage/async-storage';

import { APPLICATIONS_STORAGE_KEY } from './constants';

export async function getApplicationsStorageData() {
  try {
    const data = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    throw new Error(error);
  }
}

export async function setApplicationsStorageData(data) {
  try {
    const jsonData = JSON.stringify(data);

    await AsyncStorage.setItem(APPLICATIONS_STORAGE_KEY, jsonData);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Reducer function for the Blockchain Applications Management context.
 * @param {Array} state - Current state of applications.
 * @param {Object} action - Action to dispatch for updating the state.
 * Can be "set" applications, "add" application and "delete" application.
 * @returns {Array} state - The context state of saved applications.
 */
export function applicationsContextReducer(state, { type, applications, application }) {
  switch (type) {
    case 'init':
      return applications;

    case 'add': {
      if (state.find((app) => app.chainID === application.chainID)) {
        return state;
      }

      const updatedState = [...state, application];

      setApplicationsStorageData(updatedState);

      return updatedState;
    }

    case 'delete': {
      const updatedState = state.filter((app) => app.chainID !== application.chainID);

      setApplicationsStorageData(updatedState);

      return updatedState;
    }

    default:
      return state;
  }
}
