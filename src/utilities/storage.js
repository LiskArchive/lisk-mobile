import { AsyncStorage } from 'react-native';
import reg from '../constants/regex';

const blankAccounts = [];

const validateAccounts = (data) => {
  const parsedData = JSON.parse(data);
  if (parsedData.reduce((acc, item) =>
    reg.address.test(item.address) && item.label.length < 16, true)) {
    return parsedData;
  }
  return blankAccounts;
};

const validateSettings = (data) => {
  const parsedData = JSON.parse(data);
  const test = {
    hasStoredPassphrase: flag => typeof flag === 'boolean',
    bioAuthRecommended: flag => typeof flag === 'boolean',
    sensorType: str => /Face\sID|Fingerprint|Touch\sID/.test(str) || str === null,
  };

  if (!parsedData || typeof parsedData !== 'object') return {};
  const validatedSettings = Object.keys(parsedData)
    .reduce((acc, key) => {
      if (test[key](parsedData[key])) {
        acc[key] = parsedData[key];
      }
      return acc;
    }, {});
  return validatedSettings;
};

async function persistData(key, data) {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (error) {
    return new Promise()
      .then(() => ({ message: 'Error persisting data' }))
      .catch(() => ({ message: 'Error persisting data' }));
  }
}

async function fetchData(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return new Promise()
      .then(() => ({ message: 'Error retrieving data' }))
      .catch(() => ({ message: 'Error retrieving data' }));
  }
}

export const retrieveAccounts = () =>
  fetchData('LiskfollowedAccounts')
    .then(data => validateAccounts(data))
    .catch(() => blankAccounts);

export const storeFollowedAccount = followedAccountsList =>
  persistData('LiskfollowedAccounts', followedAccountsList)
    .then(data => data)
    .catch(err => err);

export const getSettings = () =>
  fetchData('LiskSettings')
    .then(data => validateSettings(data))
    .catch(() => blankAccounts);

export const storeSettings = settings =>
  persistData('LiskSettings', settings)
    .then(data => data)
    .catch(err => err);
