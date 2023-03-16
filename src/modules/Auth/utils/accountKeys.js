/* eslint-disable max-lines */
import { passphrase as LiskPassphrase, cryptography } from '@liskhq/lisk-client';
import regex from 'constants/regex';

/**
 * Extracts wallet address from passphrase for given token.
 * @param {String} tokenType
 * @param {String} passphrase
 * @returns {String}
 */
export const extractAddress = (passphrase) => {
  const { publicKey } = cryptography.legacy.getKeys(passphrase);
  return cryptography.address.getLisk32AddressFromPublicKey(publicKey).toString('hex');
};

/**
 * Extracts Lisk PrivateKey/PublicKey pair from a given valid Mnemonic passphrase
 *
 * @param {String} passphrase - Valid Mnemonic passphrase
 * @param {boolean} enableCustomDerivationPath - enable custom derivation for HW
 * @param {String} derivationPath - custom derivation path for HW
 * @returns {object} - Extracted publicKey for a given valid passphrase
 */
export const extractKeyPair = async ({
  passphrase,
  enableCustomDerivationPath = false,
  derivationPath,
}) => {
  if (enableCustomDerivationPath) {
    const privateKey = await cryptography.ed.getPrivateKeyFromPhraseAndPath(
      passphrase,
      derivationPath
    );
    const publicKey = cryptography.ed.getPublicKeyFromPrivateKey(privateKey).toString('hex');
    return {
      publicKey,
      privateKey: privateKey.toString('hex'),
      isValid: true,
    };
  }

  if (LiskPassphrase.Mnemonic.validateMnemonic(passphrase)) {
    const keyPair = cryptography.legacy.getKeys(passphrase);
    return {
      publicKey: keyPair.publicKey.toString('hex'),
      privateKey: keyPair.privateKey.toString('hex'),
      isValid: true,
    };
  }
  return { isValid: false };
};

/**
 * Extracts Lisk PublicKey from a given valid Mnemonic passphrase
 *
 * @param {String} passphrase - Valid Mnemonic passphrase
 * @param {boolean} enableCustomDerivationPath - enable custom derivation for HW
 * @param {String} derivationPath - custom derivation path for HW
 * @returns {String?} - Extracted publicKey for a given valid passphrase
 */
export const extractPublicKey = (
  passphrase,
  enableCustomDerivationPath = false,
  derivationPath
) => {
  const keyPair = extractKeyPair({ passphrase, enableCustomDerivationPath, derivationPath });

  if (keyPair.isValid) {
    return keyPair.publicKey;
  }

  throw Error('Invalid passphrase');
};

/**
 * Extracts address from publicKey
 *
 * @param {String} data PublicKey in Hex
 * @returns {String} - address derived from the given publicKey
 */
export const extractAddressFromPublicKey = (data) => {
  if (regex.publicKey.test(data)) {
    const binaryPublicKey = Buffer.from(data, 'hex');
    return cryptography.address.getLisk32AddressFromPublicKey(binaryPublicKey).toString('hex');
  }
  if (Buffer.isBuffer(data)) {
    return cryptography.address.getLisk32AddressFromPublicKey(data);
  }
  throw Error(`Unable to convert publicKey ${data} to address`);
};
