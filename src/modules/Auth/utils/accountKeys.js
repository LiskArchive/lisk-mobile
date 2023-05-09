/* eslint-disable max-lines */
import { passphrase as LiskPassphrase, cryptography } from '@liskhq/lisk-client';
import regex from 'constants/regex';

/**
 * Extracts wallet address from recoveryPhrase for given token.
 * @param {String} tokenType
 * @param {String} recoveryPhrase
 * @returns {String}
 */
export const extractAddress = (recoveryPhrase) => {
  const { publicKey } = cryptography.legacy.getKeys(recoveryPhrase);
  return cryptography.address.getLisk32AddressFromPublicKey(publicKey).toString('hex');
};

/**
 * Extracts Lisk PrivateKey/PublicKey pair from a given valid Mnemonic recoveryPhrase
 *
 * @param {String} recoveryPhrase - Valid Mnemonic recoveryPhrase
 * @param {boolean} enableCustomDerivationPath - enable custom derivation for HW
 * @param {String} derivationPath - custom derivation path for HW
 * @returns {object} - Extracted publicKey for a given valid recoveryPhrase
 */
export const extractKeyPair = async ({
  recoveryPhrase,
  enableCustomDerivationPath = false,
  derivationPath,
}) => {
  if (enableCustomDerivationPath) {
    const privateKey = await cryptography.ed.getPrivateKeyFromPhraseAndPath(
      recoveryPhrase,
      derivationPath
    );
    const publicKey = cryptography.ed.getPublicKeyFromPrivateKey(privateKey).toString('hex');
    return {
      publicKey,
      privateKey: privateKey.toString('hex'),
      isValid: true,
    };
  }

  if (LiskPassphrase.Mnemonic.validateMnemonic(recoveryPhrase)) {
    const keyPair = cryptography.legacy.getKeys(recoveryPhrase);
    return {
      publicKey: keyPair.publicKey.toString('hex'),
      privateKey: keyPair.privateKey.toString('hex'),
      isValid: true,
    };
  }
  return { isValid: false };
};

/**
 * Extracts Lisk PublicKey from a given valid Mnemonic recoveryPhrase
 *
 * @param {String} recoveryPhrase - Valid Mnemonic recoveryPhrase
 * @param {boolean} enableCustomDerivationPath - enable custom derivation for HW
 * @param {String} derivationPath - custom derivation path for HW
 * @returns {String?} - Extracted publicKey for a given valid recoveryPhrase
 */
export const extractPublicKey = (
  recoveryPhrase,
  enableCustomDerivationPath = false,
  derivationPath
) => {
  const keyPair = extractKeyPair({ recoveryPhrase, enableCustomDerivationPath, derivationPath });

  if (keyPair.isValid) {
    return keyPair.publicKey;
  }

  throw Error('Invalid secret recovery phrase');
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
