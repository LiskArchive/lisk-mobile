import * as Lisk from '@liskhq/lisk-client';
import { setGenericPassword, getGenericPassword, ACCESSIBLE } from 'react-native-keychain';
import { getUniqueId } from 'react-native-device-info';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Platform } from 'react-native';
import { RECOVERY_PHRASE_STRENGTHS_PER_WORD } from '../constants/recoveryPhrase.constants';

const fullWordsList = Lisk.passphrase.Mnemonic.wordlists.EN;

/**
 * Checks validity of recoveryPhrase using to mnemonic
 *
 * detects validity of each word individually
 * the result consist of [multiple] object[s]
 * which have a member with a 'code' key whose value
 * is one of the below
 * INVALID_AMOUNT_OF_WORDS
 * INVALID_AMOUNT_OF_WHITESPACES
 * INVALID_AMOUNT_OF_UPPERCASE_CHARACTER
 * INVALID_MNEMONIC
 *
 * and a message which indicates the issue
 * in a more human readable fashion
 *
 * @param {string} recoveryPhrase
 * @returns {Array} the validation result containing object[s] with:
 *  {String} code - specified the possible codes in the description above
 *  {String} message - A descriptive message for what went wrong
 */
export const validateRecoveryPhrase = (recoveryPhrase = '') => {
  if (recoveryPhrase.trim().length === 0) {
    return [{ code: 'empty_value', message: 'Invalid secret recovery phrase.' }];
  }
  const numberOfWords = Math.ceil(recoveryPhrase.trim().split(' ').length / 3) * 3;
  const validPassLength = Math.max(Math.min(numberOfWords, 24), 12);
  return Lisk.passphrase.validation.getPassphraseValidationErrors(
    recoveryPhrase,
    undefined,
    validPassLength
  );
};

/**
 * Generate a random mnemonic recovery phrase. Defaults to 128-bits of entropy.
 * @param {number} strength - Strength parameter to generate the recovery phrase.
 * (optional). Default value is 128 (which will generate a 12 words recovery phrase).
 * @returns {string} A valid mnemoic recovery phrase.
 */
export const generateRecoveryPhrase = (strength = RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words']) =>
  Lisk.passphrase.Mnemonic.generateMnemonic(strength);

export const getRecoveryPhraseFromKeyChain = () =>
  getGenericPassword({ service: 'io.lisk.mobile' });

/**
 * Removes the account password and address on the keychain of the device
 */
export const removeAccountPasswordFromKeychain = async (address) => {
  const uniqueId = getUniqueId();
  const db = await getRecoveryPhraseFromKeyChain();
  let deviceAccounts = {};
  try {
    const previousAccounts = JSON.parse(db.password);
    if (
      previousAccounts &&
      typeof previousAccounts === 'object' &&
      !Array.isArray(previousAccounts)
    ) {
      deviceAccounts = previousAccounts;
    }
  } catch (error) {
    deviceAccounts = {};
  }
  delete deviceAccounts[address];
  await setGenericPassword(uniqueId, JSON.stringify(deviceAccounts), {
    accessGroup: '58UK9RE9TP.io.lisk.mobile',
    service: 'io.lisk.mobile',
    accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

/**
 * @param {string} address
 * @returns {string | Error} password to account or error object if not found
 * fetch account password from keychain
 */
export const getAccountPasswordFromKeyChain = async (address) => {
  try {
    const db = await getRecoveryPhraseFromKeyChain();
    const accounts = JSON.parse(db.password);
    if (accounts) {
      return accounts[address];
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

/**
 * @param {string} address
 * @param {string} password
 * Store the password and address on the keychain of the device
 */
export const storeAccountPasswordInKeyChain = async (address, password) => {
  const uniqueId = getUniqueId();
  const db = await getRecoveryPhraseFromKeyChain();
  let deviceAccounts = {};
  try {
    const previousAccounts = JSON.parse(db.password);
    if (
      previousAccounts &&
      typeof previousAccounts === 'object' &&
      !Array.isArray(previousAccounts)
    ) {
      deviceAccounts = previousAccounts;
    }
  } catch (error) {
    deviceAccounts = {};
  }
  deviceAccounts[address] = password;
  await setGenericPassword(uniqueId, JSON.stringify(deviceAccounts), {
    accessGroup: '58UK9RE9TP.io.lisk.mobile',
    service: 'io.lisk.mobile',
    accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

/**
 * @param {function} successCallback
 * @param {function} errorCallback
 * @param {string} description - this is the description that will be shown in IOS
 *  when a device request fingerprint
 * first check bio metric Sensor availability after that authenticate a user base on that
 */
// eslint-disable-next-line max-statements
export const bioMetricAuthentication = async ({
  successCallback,
  errorCallback = (err) => err,
  description,
  androidError,
}) => {
  const defaultTitle = 'Scan your fingerprint on the device scanner';
  let authConfig = {
    description: description || defaultTitle,
  };

  if (Platform.OS === 'android' && Platform.Version < 23) {
    authConfig = {
      onAttempt: androidError,
    };
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    authConfig = {
      title: description || defaultTitle,
    };
  }

  FingerprintScanner.authenticate(authConfig)
    .then(() => {
      if (Platform.OS === 'android') {
        FingerprintScanner.release();
      }
      successCallback();
    })
    .catch((error) => {
      errorCallback(error);
    });
};

/**
 * it generates 2 set of array witch contains some options for filling empty spaces
 * @param {array} recoveryPhraseWords - it contains an array of recoveryPhrase words
 * @param {array} missingWords - indexes of missing word in recoveryPhrase
 */
export const assembleWordOptions = (recoveryPhraseWords, missingWords) => {
  const getRandomWord = () => {
    let rand;

    do {
      rand = Math.floor(Math.random() * 2048);
    } while (recoveryPhraseWords.includes(fullWordsList[rand]));

    return fullWordsList[rand];
  };

  const mixWithMissingWords = (options) => {
    options.forEach((list, listIndex) => {
      const rand = Math.floor(Math.random() * 0.99 * list.length);
      list[rand] = recoveryPhraseWords[missingWords[listIndex]];
    });

    return options;
  };

  const wordOptions = [];
  for (let i = 0; i < missingWords.length; i++) {
    wordOptions[i] = [];
    for (let j = 0; j < 3; j++) {
      wordOptions[i][j] = getRandomWord();
    }
  }

  return mixWithMissingWords(wordOptions);
};

/**
 * Returns a random index which doesn't exist in list
 *
 * @param {Array} list - The list of existing random Indexes
 * @returns {Number} random index between 0 and length of words
 */
export const randomIndex = (list, words) => {
  let index;
  do {
    index = Math.floor(Math.random() * words.length);
  } while (list.includes(index));
  return index;
};

/**
 * Returns a number of random indexes within 0 and the length of words
 * @param {Number} qty - the number of random indexes required
 * @returns {Array} the list of random indexes
 */
export const chooseRandomWords = (qty, words) => {
  const missing = [];

  for (let i = 0; i < qty; i++) {
    missing.push(randomIndex(missing, words));
  }

  return missing;
};

/**
 * Returns a secured recovery phrase made up of fixed length word "******".
 *
 * @param {string} phrase - The recovery phrase consisting of N random words.
 * @returns {string} The secured recovery phrase.
 */
export function toSecureRecoveryPhraseString(phrase) {
  if (!phrase) {
    return '';
  }

  // Split the phrase into words
  const words = phrase.split(' ');

  // Replace each word with '******'
  const securedWords = words.map(() => '******');

  // Join the words back together into a single string with spaces
  const securedPhrase = securedWords.join(' ');

  return securedPhrase;
}
