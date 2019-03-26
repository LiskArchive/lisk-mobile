import bitcoin from 'bitcoinjs-lib';
import btcConfig from '../../btc.config';
import reg from '../constants/regex';
import { tokenMap } from '../constants/tokens';

/**
 * Validates the given address with respect to the tokenType
 * @param {String} tokenType
 * @param {String} address
 * @returns {Number} -> 0: valid, 1: invalid, -1: empty
 */
// eslint-disable-next-line import/prefer-default-export
export const validateAddress = (tokenType, address) => {
  if (address === '') {
    return -1;
  }

  switch (tokenType) {
    case tokenMap.LSK.key:
    default:
      return reg.address.test(address) ? 0 : 1;

    // Reference: https://github.com/bitcoinjs/bitcoinjs-lib/issues/890
    case tokenMap.BTC.key:
      try {
        bitcoin.address.toOutputScript(address, btcConfig.network);
        return 0;
      } catch (e) {
        return 1;
      }
  }
};
