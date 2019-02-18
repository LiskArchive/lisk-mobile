import { tokenMap } from '../../constants/tokens';
import * as liskAccount from './lisk/account';
import * as btcAccount from './btc/account';

const resourceMap = {
  [tokenMap.LSK.key]: {
    account: liskAccount,
  },
  [tokenMap.BTC.key]: {
    account: btcAccount,
  },
};

export const getMappedFunction = (tokenType, map) => {
  const [resource, method] = map.split('.');

  try {
    const fn = resourceMap[tokenType][resource][method];

    if (typeof fn === 'function') {
      return fn;
    }

    throw new Error(`${tokenType} doesn't match a function for ${map}.`);
  } catch (error) {
    throw new Error(`Invalid mapper path for ${tokenType} - ${map}.`);
  }
};

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
const getSummary = (tokenType, address) => getMappedFunction(tokenType, 'account.getSummary')(address);

/**
 * Extracts public key from passphrase for given token.
 * @param {String} tokenType
 * @param {String} passphrase
 * @returns {String}
 */
const extractPublicKey = (tokenType, passphrase) => getMappedFunction(tokenType, 'account.extractPublicKey')(passphrase);

/**
 * Extracts wallet address from passphrase for given token.
 * @param {String} tokenType
 * @param {String} passphrase
 * @returns {String}
 */
const extractAddress = (tokenType, passphrase) => getMappedFunction(tokenType, 'account.extractAddress')(passphrase);

export const account = {
  getSummary,
  extractPublicKey,
  extractAddress,
};

export const transactions = {
};
