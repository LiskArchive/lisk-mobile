/* eslint-disable max-statements */
import { device, element, by, waitFor } from 'detox';
import { defaultDerivationPath } from 'utilities/explicitBipKeyDerivation';
import testConstants from '../utils/testConstants';
import { signInUser } from '../commands/auth';

describe.skip('Auth module', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
  });

  it('should add an account by recovery phrase', async () => {
    await signInUser();
    await expect(element(by.id('accounts-home-container'))).toBeVisible();
  });

  it('should display all account information', async () => {
    await expect(element(by.id('username-label'))).toBeVisible();
    await expect(element(by.id('address-copy-to-clipboard'))).toBeVisible();
    // TODO: Test tokens are displayed
    // (details on https://github.com/LiskHQ/lisk-mobile/issues/1826).
  });

  it('should edit account name', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).atIndex(0).tap();
    await element(by.id('switch-account')).tap();
    await element(by.id('account-list-item')).atIndex(1).swipe('left');
    await device.disableSynchronization();
    await element(by.id('edit-account')).atIndex(1).tap();
    await waitFor(element(by.id('account-name')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('account-name')).replaceText('tester');
    // Dismiss keyboard
    await element(by.id('edit-account')).atIndex(1).tap();
    await element(by.id('edit-name-done-button')).tap();
    await waitFor(element(by.id('edit-account-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('edit-account-button')).tap();
    await waitFor(element(by.id('switch-account')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('switch-account')).tap();
    await device.enableSynchronization();
    await expect(element(by.text('tester')).atIndex(1)).toBeVisible();
  });

  it('should remove account successfully', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).atIndex(0).tap();
    await element(by.id('switch-account')).tap();
    await element(by.id('account-list-item')).atIndex(1).swipe('left');
    await element(by.id('delete-account')).atIndex(1).tap();
    await element(by.id('download-file-button')).tap();
    await element(by.id('delete-account-button')).atIndex(0).tap();
    await expect(element(by.id('secret-phrase'))).toBeVisible();
  });

  it('should add account by file upload', async () => {
    device.reloadReactNative();
    await element(by.id('restore-from-file')).tap();
    await element(by.id('decrypt-password-input')).tap();
    await element(by.id('decrypt-password-input')).replaceText('Password1!');
    await element(by.id('decrypt-button-continue')).tap();
    await expect(element(by.id('account-list-item')).atIndex(0)).toBeVisible();
  });

  it('should register new account', async () => {
    device.reloadReactNative();
    const recoveryPhraseArray = testConstants.secretRecoveryPhrase.split(' ');
    await element(by.id('add-account')).tap();
    await element(by.id('createAccountButton')).tap();
    await element(by.id('12-word-srp')).tap();
    await element(by.id('continue-to-srp')).tap();
    await element(by.id('understandResponsibilitySwitch')).tap();
    await element(by.id('safeKeepingButton')).tap();
    await element(by.id(`recoveryPhrasePlaceholderFor-${recoveryPhraseArray[0]}`)).tap();
    await element(by.id(`recoveryPhraseOptionFor-${recoveryPhraseArray[0]}`)).tap();
    await element(by.id(`recoveryPhrasePlaceholderFor-${recoveryPhraseArray[1]}`)).tap();
    await element(by.id(`recoveryPhraseOptionFor-${recoveryPhraseArray[1]}`)).tap();
    await element(by.id('registerConfirmButton')).atIndex(0).tap();
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
    await device.disableSynchronization();
    await waitFor(element(by.id('download-file-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('download-file-button')).atIndex(0).tap();
    await device.enableSynchronization();
    await element(by.id('result-screen-continue')).atIndex(0).tap();
    await expect(element(by.id('accounts-home-container'))).toBeVisible();
  });

  describe('Derivation path', () => {
    it('should add an account with derivation path enabled', async () => {
      device.reloadReactNative();
      await element(by.id('add-account')).tap();
      await element(by.id('derivation-switch')).tap();
      await element(by.id('secret-phrase')).tap();
      await expect(element(by.id('derivation-path-input'))).toBeVisible();
      await element(by.id('derivation-path-input')).typeText('invalid-path');
      await expect(element(by.id('derivation-path-input-error'))).toBeVisible();
      await element(by.id('derivation-path-input')).replaceText(defaultDerivationPath);
      await element(by.id('signInRecoveryPhaseInput')).tap();
      await element(by.id('signInRecoveryPhaseInput')).typeText(testConstants.secretRecoveryPhrase);
      await element(by.id('secret-recovery-screen')).tap();
      await element(by.id('continue-button')).tap();
      await element(by.id('enter-password')).tap();
      await element(by.id('enter-password')).typeText(testConstants.password);
      await element(by.id('confirm-password')).tap();
      await element(by.id('confirm-password')).typeText(testConstants.password);
      await element(by.id('account-name')).tap();
      await element(by.id('account-name')).typeText(testConstants.accountName);
      await element(by.id('password-setup-form')).tap();
      await element(by.id('agree-switch')).tap();
      await element(by.id('save-account')).tap();
      await device.disableSynchronization();
      await waitFor(element(by.id('download-file-button')))
        .toBeVisible()
        .withTimeout(10000);
      await element(by.id('download-file-button')).atIndex(0).tap();
      await device.enableSynchronization();
      await element(by.id('result-screen-continue')).atIndex(0).tap();
      await expect(element(by.id('accounts-home-container'))).toBeVisible();
    });
  });
});
