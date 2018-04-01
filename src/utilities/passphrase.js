/**
 * @todo Import mnemonic and remove this mock
 */
const mnemonic = word => [
  'ali',
  'angela',
  'hamid',
  'tania',
  'john',
  'jenny',
  'tim',
  'sara',
  'mike',
  'eve',
  'simon',
  'ashley',
  'marcel',
  'rose',
  'luis',
  ].includes(word);

/**
 * Checks validity of passphrase using to mnemonic
 * 
 * detects validity of each word individually
 * the resulting array is a number instead of each word indicating its validity status
 * 0 -> valid
 * 1 -> not a mnemonic word
 * 2 -> duplicated
 * 
 * over status:
 * valid {Number}
 * 0 -> valid
 * 1 -> short
 * 2 -> has invalid words
 *
 * @param {string} passphrase
 * @returns {Object} the validation result containing:
 *  {Number[]} words - The v. status of each word
 *  {Boolean} valid - The v. status of the given passphrase
 */
export const validatePassphrase = (passphrase) => {
  const rawWords = passphrase.trim().replace(/\s+/g, ' ').split(' ').filter(item => item !== '');
  if (rawWords.length === 0) {
    return 3; // empty string
  }
  const words = new Array(rawWords.length);

  const wordsStatus = words.map((word) => {
    if (!mnemonic(word)) {
      return 1; // not a mnemonic word
    } else if (words.indexOf(word) !== words.lastIndexOf(word)) {
      return 2; // duplicated
    }
    return 0; // valid and unique
  });

  let valid = words.reduce((acc, item) => acc + item, 0);
  if (valid > 0) {
    valid = 2;
  } else if (valid === 0 && words.length < 12) {
    valid = 1;
  }
  return valid;
};
