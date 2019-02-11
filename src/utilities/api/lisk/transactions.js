import Lisk from '@liskhq/lisk-client';

/**
 * Gets the list of transactions for a given filtering config
 *
 * @param {Object} data
 * @param {String?} data.id - A valid ID for specific transaction
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
export const send = (activePeer, data) =>
  new Promise((resolve, reject) => {
    const transaction = Lisk.transaction.transfer(data);

    setTimeout(() => {
      activePeer.transactions.broadcast(transaction)
        .then(() => resolve(transaction))
        .catch(error => reject(error));
    }, 1001);
  });
