import getMappedFunction from './functionMapper';

/**
 * @typedef {Object} AccountSummary
 * @property {String} address
 * @property {Number} balance
 * @property {Boolean} initialized
 */
/**
 * Retrieves account summary for related token from Node API.
 * @param {String} tokenType
 * @param {String} address
 * @returns {Promise<AccountSummary>}
 */
const getSummary = (tokenType, address) => getMappedFunction(tokenType, 'account', 'getSummary')(address);

/**
 * Extracts public key from passphrase for given token.
 * @param {String} tokenType
 * @param {String} passphrase
 * @returns {String}
 */
const extractPublicKey = (tokenType, passphrase) => getMappedFunction(tokenType, 'account', 'extractPublicKey')(passphrase);

/**
 * Extracts wallet address from passphrase for given token.
 * @param {String} tokenType
 * @param {String} passphrase
 * @returns {String}
 */
const extractAddress = (tokenType, passphrase) => getMappedFunction(tokenType, 'account', 'extractAddress')(passphrase);

export default {
  getSummary,
  extractPublicKey,
  extractAddress,
};
