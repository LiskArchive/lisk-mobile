import { AsyncStorage } from 'react-native';
import storage from "../constants/storage";

const blankAccounts = { list: [], active: -1 };

const validateAccounts = (data) => {
  const parsedData = JSON.parse(data);
  if (parsedData.list && parseInt(parsedData.active) < parsedData.list.length) {
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
  fetchData(storage.accounts)
    .then(data => validateAccounts(data))
    .catch(() => blankAccounts);

export const storeAccounts = (data) =>
  persistData(storage.accounts, data)
    .then(data => data)
    .catch(err => err);
