import { AsyncStorage } from 'react-native';
import storage from "../constants/storage";
import reg from '../constants/regex';

const blankAccounts = [];
const storageTitle = 'LiskfollowedAccounts';

const validateAccounts = (data) => {
  const parsedData = JSON.parse(data);
  if (parsedData.reduce((acc, item) => reg.address.test(item), true)) {
    return parsedData;
  }
  return blankAccounts;
};


async function persistData (key, data) {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (error) {
    return new Promise()
      .then(() => ({ message: 'Error persisting accounts 1' }))
      .catch(() => ({ message: 'Error persisting accounts 2' }))
  }
}

async function fetchData (key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return new Promise()
      .then(() => ({ message: 'Error retrieving accounts 1' }))
      .catch(() => ({ message: 'Error retrieving accounts 2' }))
  }
}

export const retrieveAccounts = () =>
  fetchData(storageTitle)
    .then(data => validateAccounts(data))
    .catch(() => blankAccounts);

export const storeFollowedAccount = (address, list) =>
  persistData(storageTitle, [...list.filter(item => item !== address), address])
    .then(data => data)
    .catch(err => err);

export const storeUnFollowedAccount = (address, list) =>
  persistData(storageTitle, list.filter(item => item !== address))
    .then(data => data)
    .catch(err => err);
