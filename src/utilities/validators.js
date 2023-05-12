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

/**
 * Validates a transaction amount.
 *
 * @param {string} value - The transaction amount to validate.
 * @returns {boolean} True if the transaction amount is valid; false otherwise.
 *
 * A valid transaction amount is a positive number represented as a string.
 * It may include a decimal point.
 */
export function isTransactionAmountValid(value) {
  const regex = /^\d*\.?\d+$/;
  if (!regex.test(value)) {
    return false;
  }
  if (Number(value) < 0) {
    return false;
  }
  return true;
}
