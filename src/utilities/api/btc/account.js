import config from './config';

// eslint-disable-next-line import/prefer-default-export
export const getAccount = address => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`${config.url}/balance?active=${address}`, config.requestOptions);
    const json = await response.json();

    if (response.ok) {
      resolve({
        address,
        balance: json[address].final_balance,
      });
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});
