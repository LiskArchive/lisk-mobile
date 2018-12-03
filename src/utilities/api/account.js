import Lisk from 'lisk-elements';

/**
 * Returns a promise to fetch the details of a
 * given Lisk ID (address)
 *
 * @param {String} address - Lisk ID
 * @returns {Promise} The HTTP call promise
 */
export const getAccount = (activePeer, address) =>
  new Promise((resolve, reject) => {
    activePeer.accounts.get({ address })
      .then((res) => {
        if (res.data.length > 0) {
          resolve({
            ...res.data[0],
            initialized: !!res.data[0].publicKey,
          });
        } else {
          // when the account has no transactions yet (therefore is not saved on the blockchain)
          // this endpoint returns { success: false }
          resolve({
            address,
            balance: 0,
          });
        }
      })
      .catch(reject);
  });

/**
 * Returns a promise to fetch the address from given passphrase
 * or publicKey
 *
 * @todo This is temporary and must be removed after Lisk elements
 * is injected to this project
 * Must be Http('/address', { key });
 *
 * @param {String} key - A valid Passphrase or PublicKey
 * @returns {Promise} The HTTP call promise
 */
export const extractAddress = (data) => {
  if (data.indexOf(' ') < 0) {
    return Lisk.cryptography.getAddressFromPublicKey(data);
  }
  return Lisk.cryptography.getAddressFromPassphrase(data);
};

export const extractPublicKey = passphrase =>
  Lisk.cryptography.getKeys(passphrase).publicKey;
