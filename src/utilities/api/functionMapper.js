import { tokenMap } from '../../constants/tokens';
import * as liskAccount from './lisk/account';
import * as liskTransactions from './lisk/transactions';
import * as btcAccount from './btc/account';
import * as btcTransactions from './btc/transactions';
import * as liskService from './lisk/service';
import * as btcService from './btc/service';

/**
 * Resource oriented mapping from token type to utility functions.
 */
const resourceMap = {
  [tokenMap.LSK.key]: {
    account: liskAccount,
    transactions: liskTransactions,
    service: liskService,
  },
  [tokenMap.BTC.key]: {
    account: btcAccount,
    transactions: btcTransactions,
    service: btcService,
  },
};

/**
 * Extracts related account API utility for given tokenType and map address.
 * @param {String} tokenType
 * @param {String} mapAddress Valid key path for a utility function, eg: account.getSummary
 * @returns {Function}
 */
const getMappedFunction = (tokenType, mapAddress) => {
  const [resource, method] = mapAddress.split('.');

  try {
    const fn = resourceMap[tokenType][resource][method];

    if (typeof fn === 'function') {
      return fn;
    }

    throw new Error(`${tokenType} doesn't match a function for ${mapAddress}.`);
  } catch (error) {
    throw new Error(`Invalid mapper path for ${tokenType} - ${mapAddress}.`);
  }
};

export default getMappedFunction;
