const reactNative = jest.genMockFromModule('react-native');

class MockAsyncStorage {
  constructor(cache = {}) {
    this.cache = cache;
  }

  getItem = key => new Promise((resolve, reject) => {
    if (typeof key !== 'string') {
      return reject(new Error('Invalid key'));
    }

    return resolve(this.cache[key]);
  })

  setItem = (key, data) => new Promise((resolve, reject) => {
    if (typeof key !== 'string') {
      return reject(new Error('Invalid key'));
    }

    this.cache[key] = data;
    return resolve(true);
  })

  removeItem = key => new Promise((resolve, reject) => {
    if (typeof key !== 'string') {
      return reject(new Error('Invalid key'));
    }

    delete this.cache[key];
    return resolve(true);
  })

  clear = () => new Promise((resolve) => {
    this.cache = {};
    return resolve(true);
  })
}

reactNative.AsyncStorage = new MockAsyncStorage();

module.exports = reactNative;
