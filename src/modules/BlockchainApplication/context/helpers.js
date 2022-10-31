import AsyncStorage from '@react-native-async-storage/async-storage';

import { BLOCKCHAIN_APPLICATIONS_STORAGE_KEY } from './constants';

export async function getBlockchainApplicationsStorageData() {
  try {
    const data = await AsyncStorage.getItem(BLOCKCHAIN_APPLICATIONS_STORAGE_KEY);

    console.log({ data });

    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    throw new Error(error);
  }
}

export async function setBlockchainApplicationsStorageData(data) {
  console.log({ data });
  try {
    const jsonData = JSON.stringify(data);

    await AsyncStorage.setItem(BLOCKCHAIN_APPLICATIONS_STORAGE_KEY, jsonData);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
