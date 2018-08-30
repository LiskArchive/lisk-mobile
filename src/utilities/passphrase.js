import Lisk from 'lisk-elements';
import fillWordsList from 'bip39/wordlists/english.json'; // eslint-disable-line import/no-extraneous-dependencies

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
// eslint-disable-next-line import/prefer-default-export
export const validatePassphrase = (passphrase) => {
  if (passphrase.trim().length === 0) return [{ code: 'empty_value' }];
  return Lisk.passphrase.validation.getPassphraseValidationErrors(passphrase);
};

/**
 * @returns {string} a valid mnemoic passphrase
 * Generate a random mnemonic (uses crypto.randomBytes under the hood),
 * defaults to 128-bits of entropy var mnemonic = bip39.generateMnemonic()
 */
export const generatePassphrase = () => {
  const { Mnemonic } = Lisk.passphrase;
  return Mnemonic.generateMnemonic();
};

/**
 * it generates 2 set of array witch contains some options for filling empty spaces
 * @param {array} passphraseWords - it contains an array of passphrase words
 * @param {array} missingWords - indexes of missing word in passphrase
 */
export const assembleWordOptions = (passphraseWords, missingWords) => {
  const getRandomWord = () => {
    let rand;

    do {
      rand = Math.floor(Math.random() * 2048);
    }
    while (passphraseWords.includes(fillWordsList[rand]));

    return fillWordsList[rand];
  };

  const mixWithMissingWords = (options) => {
    options.forEach((list, listIndex) => {
      const rand = Math.floor(Math.random() * 0.99 * list.length);
      list[rand] = passphraseWords[missingWords[listIndex]];
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
