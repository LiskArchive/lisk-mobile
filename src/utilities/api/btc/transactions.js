import config from '../../../../btc.config';

const getSingleTransaction = hash => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`${config.url}/rawtx/${hash}`, config.requestOptions);
    const json = await response.json();

    if (response.ok) {
      resolve({
        data: json,
        meta: {
          count: 1,
        },
      });
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});

// eslint-disable-next-line import/prefer-default-export
export const get = ({
  id,
  address,
  senderAddress,
  recipientAddress,
  limit = 50,
  offset = 0,
} = {}) => {
  if (id) {
    return getSingleTransaction(id);
  }

  return new Promise(async (resolve, reject) => {
    try {
      address = address || senderAddress || recipientAddress;
      const response = await fetch(`${config.url}/rawaddr/${address}?limit=${limit}&offset=${offset}`, config.requestOptions);
      const json = await response.json();

      if (response.ok) {
        resolve({
          data: json.txs,
          meta: {
            count: json.n_tx,
          },
        });
      } else {
        reject(json);
      }
    } catch (error) {
      reject(error);
    }
  });
};
