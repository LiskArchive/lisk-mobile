/* eslint-disable import/export */
import testConstants from '../../../../e2e/utils/testConstants';

// eslint-disable-next-line import/extensions
export * from './passphrase.js';

export const generatePassphrase = () => testConstants.secretRecoveryPhrase;

export const chooseRandomWords = () => [0, 1];
