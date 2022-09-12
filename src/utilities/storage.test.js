import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistData,
  fetchData,
  getSettings,
  storeSettings,
  blankSettings,
  storeFollowedAccount,
  blankAccounts,
  retrieveAccounts,
} from './storage';
import { merge } from './helpers';

const items = {};

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn((item, value) => {
      return new Promise((resolve) => {
        items[item] = value;
        resolve(value);
      });
    }),
    multiSet: jest.fn((item, value) => {
      return new Promise((resolve) => {
        items[item] = value;
        resolve(value);
      });
    }),
    getItem: jest.fn((item) => {
      return new Promise((resolve) => {
        resolve(items[item]);
      });
    }),
    multiGet: jest.fn((item) => {
      return new Promise((resolve) => {
        resolve(items[item]);
      });
    }),
    removeItem: jest.fn((item) => {
      return new Promise((resolve) => {
        resolve(delete items[item]);
      });
    }),
    getAllKeys: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(items.keys());
      });
    }),
  },
}));

describe('persistData/fetchData', () => {
  beforeAll(() => AsyncStorage.clear());

  const KEY = 'key';
  const INVALID_KEY = {};
  const DATA = { test: 'test' };

  it('writes to AsyncStorage', async () => {
    const result = await persistData(KEY, DATA);
    expect(result).toMatchObject(DATA);
  });

  it('reads from Async Storage', async () => {
    const result = await fetchData(KEY);
    expect(JSON.parse(result)).toMatchObject(DATA);
  });

  it('throws error while writing to invalid keys', async () => {
    try {
      await persistData(INVALID_KEY, DATA);
    } catch (error) {
      expect(error.message).toBe('Error saving data');
    }
  });

  it('throws error while reading from invalid keys', async () => {
    try {
      await fetchData(INVALID_KEY);
    } catch (error) {
      expect(error.message).toBe('Error retrieving data');
    }
  });
});

describe('storeSettings/getSettings', () => {
  beforeAll(() => AsyncStorage.clear());
  const SETTINGS_TO_STORE = { test: 'test' };

  it('writes wrong typed settings as valid format', async () => {
    const result = await storeSettings('invalid_settings');
    expect(result).toMatchObject(blankSettings);
  });

  it('reads empty settings from storage', async () => {
    const result = await getSettings();
    expect(result).toMatchObject(blankSettings);
  });

  it('writes settings to storage', async () => {
    const result = await storeSettings(SETTINGS_TO_STORE);
    expect(result).toMatchObject(merge(SETTINGS_TO_STORE, blankSettings));
  });

  it('reads written settings from storage', async () => {
    const result = await getSettings();
    expect(result).toMatchObject(SETTINGS_TO_STORE);
  });
});

describe('storeFollowedAccounts/retrieveFollowedAccounts', () => {
  beforeAll(() => AsyncStorage.clear());

  const ACCOUNTS_TO_STORE = [{ address: '1L', label: '1L' }];

  it('writes wrong typed accounts as validated format', async () => {
    const result = await storeFollowedAccount('invalid_accounts');
    expect(result).toMatchObject(blankAccounts);
  });

  it('reads empty accounts from storage', async () => {
    const result = await retrieveAccounts();
    expect(result).toMatchObject(blankAccounts);
  });

  it('writes accounts to storage', async () => {
    const result = await storeFollowedAccount(ACCOUNTS_TO_STORE);
    expect(result).toMatchObject(ACCOUNTS_TO_STORE);
  });

  it('reads written accounts from storage', async () => {
    const result = await retrieveAccounts();
    expect(result).toMatchObject(ACCOUNTS_TO_STORE);
  });
});
