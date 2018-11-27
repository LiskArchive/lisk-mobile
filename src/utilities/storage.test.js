jest.mock('AsyncStorage');

// eslint-disable-next-line
import {
  persistData,
  fetchData,
} from './storage';

describe('storage: persistData/fetchData', () => {
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
      expect(error.message).toBe('Error retrieving data');
    }
  });

  it('throws error while reading from invalid keys', async () => {
    try {
      await fetchData(INVALID_KEY, DATA);
    } catch (error) {
      expect(error.message).toBe('Error retrieving data');
    }
  });
});
