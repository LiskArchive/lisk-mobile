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
    activePeer.accounts.get({ address }).then((res) => {
      if (res.data.length > 0) {
        resolve({
          ...res.data[0],
          serverPublicKey: res.data[0].publicKey,
        });
      } else {
        // when the account has no transactions yet (therefore is not saved on the blockchain)
        // this endpoint returns { success: false }
        resolve({
          address,
          balance: 0,
        });
      }
    }).catch(reject);
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

/**
 * Gets the list of transactions for a given filtering config
 *
 * @param {Object} data
 * @param {String?} data.senderId - A valid Lisk ID to filter the senderID
 * @param {String?} data.recipientId - A valid Lisk ID to filter the recipientId
 * @param {Number?} limit - defaults on 25
 * @param {Number?} offset - defaults on 0
 * @param {String?} orderBy - defaults on timestamp:desc
 *
 * @returns {Promise} The HTTP call promise
 * @todo some properties need default values
 */
export const getTransactions = (activePeer, data) => {
  data.sort = 'timestamp:desc';
  return activePeer.transactions.get(data);
};

/**
 * Creates a new transactions
 *
 * @param {Object} data
 * @param {String} data.recipientId - A valid Lisk ID
 * @param {Object} data.amount - Amount of lisk multiplied by 10^8
 * @param {Object} data.passphrase - Primary passphrase (Valid mnemonic)
 * @param {Object} data.secondPassphrase - Secondary passphrase (Valid mnemonic)
 *
 * @returns {Promise} The HTTP call promise
 */
export const send = (activePeer, data) => {
  const transaction = Lisk.transaction.transfer(data);
  return activePeer.transactions.broadcast(transaction);
};
// eslint-disable-next-line new-cap
// Http('/transactions', data, 'POST');
