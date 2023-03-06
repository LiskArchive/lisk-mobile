import { cryptography } from '@liskhq/lisk-client';

/**
 * Validates the given address with respect to the tokenType
 * @param {String} tokenType
 * @param {String} address
 * @returns {Number} -> 0: valid, 1: invalid, -1: empty
 */
// eslint-disable-next-line import/prefer-default-export
export const validateAddress = (address) => {
  if (address === '') {
    return -1;
  }
  try {
    cryptography.address.validateLisk32Address(address);
    return 0;
  } catch (error) {
    return 1;
  }
};
