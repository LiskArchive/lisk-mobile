/**
 * This is a wrapper over react native fetch Api
 * Which returns a promise to be easily used in actions and middlewares
 * Any normalization of data transfer, error code or headers shall be
 * implemented in this method.
 *
 * @param {String} path - relative path of the endpoint
 *  This method adds http://localhost:5000 to the beginning
 * @param {Object} data - A key-value pair of payload data
 * @param {String?} method - GET/POST/UPDATE/DELETE
 * 
 * @returns {Promise} The HTTP call promise
 */
async function Http (path, data, method='GET') {
  let url;
  let payload;
  if (typeof method === 'string' && method !== 'GET') {
    url = `http://localhost:5000${url}`;
    payload = JSON.stringify(data);
  } else {
    const params = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
    url = `http://localhost:5000${url}?${params}`;
    payload = JSON.stringify({});
  }
  let response = await fetch(
    url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload
  });
  let responseText = await response.text();
  if (response.status >= 200 && response.status < 300) {
    return responseText;
  
  } else {
    throw responseText
  }
}

/**
 * Returns a promise to fetch the details of a
 * given Lisk ID (address)
 *
 * @param {String} address - Lisk ID
 * @returns {Promise} The HTTP call promise
 */
export const getAccount = (address) =>
  Http('/getAccount', { address });

/**
 * Returns a promise to fetch the address from given passphrase
 * or publicKey
 *
 * @todo This is temporary and must be removed after Lisk elements
 * is injected to this project
 *
 * @param {String} key - A valid Passphrase or PublicKey
 * @returns {Promise} The HTTP call promise
 */
export const extractAddress = (key) =>
  // Http('/address', { key });
  '6307319849853921018L';
