/* eslint-disable max-statements */
import { element, by, waitFor } from 'detox';
import testConstants from '../utils/testConstants';

export const signInUser = async () => {
  await element(by.id('secret-phrase')).atIndex(1).tap();
  await element(by.id('signInPassphraseInput')).tap();
  await element(by.id('signInPassphraseInput')).typeText(`${testConstants.secretRecoveryPhrase}`);
  await element(by.id('secret-recovery-screen')).tap();
  await waitFor(element(by.id('continue-button')))
    .toBeVisible()
    .withTimeout(1000);
  await element(by.id('continue-button')).tap();
  await element(by.id('enter-password')).tap();
  await element(by.id('enter-password')).typeText(`${testConstants.password}`);
  await element(by.id('confirm-password')).tap();
  await element(by.id('confirm-password')).typeText(`${testConstants.password}`);
  await element(by.id('account-name')).tap();
  await element(by.id('account-name')).typeText(`${testConstants.accountName}`);
  // Dismiss keyboard
  await element(by.id('password-setup-form')).tap();
  await element(by.id('agree-switch')).tap();
  await element(by.id('save-account')).tap();
  await waitFor(element(by.id('download-file-button')))
    .toBeVisible()
    .withTimeout(10000);
  await element(by.id('download-file-button')).atIndex(0).tap();
  await element(by.id('result-screen-continue')).atIndex(0).tap();
};
