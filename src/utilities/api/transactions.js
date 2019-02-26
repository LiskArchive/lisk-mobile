import getMappedFunction from './functionMapper';

/**
 * @typedef {Object} Transaction
 * @property {String} id ID or hash of the transaction.
 * @property {String} senderAddress
 * @property {String} recipientAddress
 * @property {String} amount
 * @property {String} fee
 * @property {Number} timestamp
 * @property {Number} confirmations
 * @property {Number} type transaction type for LSK (0 for BTC)
 * @property {String} data transaction data field for LSK (empty string for BTC)
 */

/**
 * @typedef {Object} TransactionsResponse
 * @property {Array.<Transaction>} data
 * @property {Object} meta
 * @property {Number} meta.count total number of transactions available on the API.
 * @property {Number} meta.offset
 * @property {Number} meta.limit
 */

/**
 * Retrieves transactions for related token with respect to the given payload.
 * @param {String} tokenType
 * @param {Object} data
 * @param {String} data.id ID or hash of a specific transaction.
 * @param {String} data.address
 * @param {Number} data.limit
 * @param {Number} data.offset
 * @returns {Promise<TransactionsResponse>}
 */
const get = (tokenType, data) => getMappedFunction(tokenType, 'transactions.get')(data);

/**
 * Creates a raw, ready-to-broadcast transaction data with given payload.
 * @param {String} tokenType
 * @param {Object} data
 * @param {String} data.passphrase
 * @param {String} data.recipientAddress
 * @param {String} data.amount
 * @param {String} data.secondPassphrase - required if registered, only used for LSK.
 * @param {String} data.data - custom data field, only used for LSK.
 * @param {Number} data.dynamicFeePerByte - rate of miner/dynamic fee per byte, only used for BTC.
 * @returns {Promise}
 */
const create = (tokenType, data) => getMappedFunction(tokenType, 'transactions.create')(data);

/**
 * Broadcasts a transaction to the specified token's blockchain.
 * @param {String} tokenType
 * @param {Object} transaction
 * @returns {Promise}
 */
const broadcast = (tokenType, transaction) => getMappedFunction(tokenType, 'transactions.broadcast')(transaction);

export default {
  get,
  create,
  broadcast,
};
