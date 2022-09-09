import * as Lisk from '@liskhq/lisk-client'
import { setGenericPassword, getGenericPassword, resetGenericPassword } from 'react-native-keychain'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { Platform } from 'react-native'
import { extractAddress } from '../../../utilities/api/lisk/account'

const fullWordsList = Lisk.passphrase.Mnemonic.wordlists.EN

/**
 * Checks validity of passphrase using to mnemonic
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
 * @param {string} passphrase
 * @returns {Array} the validation result containing object[s] with:
 *  {String} code - specified the possible codes in the description above
 *  {String} message - A descriptive message for what went wrong
 */
export const validatePassphrase = (passphrase) => {
  if (passphrase.trim().length === 0) {
    return [{ code: 'empty_value', message: 'Invalid Passphrase' }]
  }
  const numberOfWords = Math.ceil(passphrase.trim().split(' ').length / 3) * 3
  const validPassLength = Math.max(Math.min(numberOfWords, 24), 12)
  return Lisk.passphrase.validation.getPassphraseValidationErrors(
    passphrase,
    undefined,
    validPassLength
  )
}

/**
 * @returns {string} a valid mnemoic passphrase
 * Generate a random mnemonic (uses crypto.randomBytes under the hood),
 * defaults to 128-bits of entropy var mnemonic = bip39.generateMnemonic()
 */
export const generatePassphrase = () => {
  const { Mnemonic } = Lisk.passphrase
  return Mnemonic.generateMnemonic()
}

/**
 * @param {string} passphrase
 * Store the passphrase and address on the keychain of the device
 */
export const storePassphraseInKeyChain = (passphrase) => {
  const address = extractAddress(passphrase)
  setGenericPassword(address, passphrase, {
    accessGroup: '58UK9RE9TP.io.lisk.mobile',
    service: 'io.lisk.mobile',
  })
}

/**
 * Removes the passphrase and address on the keychain of the device
 */
export const removePassphraseFromKeyChain = async (
  successCallback,
  errorCallback = (err) => err
) => {
  try {
    await resetGenericPassword({ service: 'io.lisk.mobile' })
    successCallback()
  } catch (error) {
    errorCallback(error)
  }
}

export const getPassphraseFromKeyChain = () => getGenericPassword({ service: 'io.lisk.mobile' })

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
  const defaultTitle = 'Scan your fingerprint on the device scanner'
  let authConfig = {
    description: description || defaultTitle,
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    authConfig = {
      onAttempt: androidError,
    }
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    authConfig = {
      title: description || defaultTitle,
    }
  }

  try {
    await FingerprintScanner.isSensorAvailable()
    try {
      await FingerprintScanner.authenticate(authConfig)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
  } catch (error) {
    errorCallback(error)
  }
}

/**
 * it generates 2 set of array witch contains some options for filling empty spaces
 * @param {array} passphraseWords - it contains an array of passphrase words
 * @param {array} missingWords - indexes of missing word in passphrase
 */
export const assembleWordOptions = (passphraseWords, missingWords) => {
  const getRandomWord = () => {
    let rand

    do {
      rand = Math.floor(Math.random() * 2048)
    } while (passphraseWords.includes(fullWordsList[rand]))

    return fullWordsList[rand]
  }

  const mixWithMissingWords = (options) => {
    options.forEach((list, listIndex) => {
      const rand = Math.floor(Math.random() * 0.99 * list.length)
      list[rand] = passphraseWords[missingWords[listIndex]]
    })

    return options
  }

  const wordOptions = []
  for (let i = 0; i < missingWords.length; i++) {
    wordOptions[i] = []
    for (let j = 0; j < 3; j++) {
      wordOptions[i][j] = getRandomWord()
    }
  }

  return mixWithMissingWords(wordOptions)
}
