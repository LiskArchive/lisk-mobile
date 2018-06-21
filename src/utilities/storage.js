import { AsyncStorage } from 'react-native';
import reg from '../constants/regex';

const blankAccounts = [];
const storageTitle = 'LiskfollowedAccounts';

const validateAccounts = (data) => {
  const parsedData = JSON.parse(data);
  if (parsedData.reduce((acc, item) =>
    reg.address.test(item.address) && item.label.length < 16, true)) {
    return parsedData;
  }
  return blankAccounts;
};


async function persistData(key, data) {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (error) {
    return new Promise()
      .then(() => ({ message: 'Error persisting accounts' }))
      .catch(() => ({ message: 'Error persisting accounts' }));
  }
}

async function fetchData(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return new Promise()
      .then(() => ({ message: 'Error retrieving accounts' }))
      .catch(() => ({ message: 'Error retrieving accounts' }));
  }
}

export const retrieveAccounts = () =>
  fetchData(storageTitle)
    .then(data => validateAccounts(data))
    .catch(() => blankAccounts);

export const storeFollowedAccount = followedAccountsList =>
  persistData(storageTitle, followedAccountsList)
    .then(data => data)
    .catch(err => err);
