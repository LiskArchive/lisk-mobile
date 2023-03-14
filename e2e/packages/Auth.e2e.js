/* eslint-disable max-statements */
import { device, element, by } from 'detox';
import { defaultDerivationPath } from 'utilities/explicitBipKeyDerivation';
import testConstants from '../utils/testConstants';

describe('Auth module', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
  });

  it('should add an account by recovery phrase', async () => {
    await element(by.id('secret-phrase')).atIndex(1).tap();
    await element(by.id('signInPassphraseInput')).tap();
    await element(by.id('signInPassphraseInput')).replaceText(testConstants.secretRecoveryPhrase);
    await element(by.id('continue-button')).tap();
    await element(by.id('enter-password')).tap();
    await element(by.id('enter-password')).replaceText(testConstants.password);
    await element(by.id('confirm-password')).tap();
    await element(by.id('confirm-password')).replaceText(testConstants.password);
    await element(by.id('account-name')).tap();
    await element(by.id('account-name')).replaceText(testConstants.accountName);
    await element(by.id('agree-switch')).tap();
    await element(by.id('save-account')).tap();
    await element(by.id('download-file-button')).atIndex(0).tap();
    await element(by.id('result-screen-continue')).atIndex(0).tap();
    await expect(element(by.id('accounts-home-container'))).toBeVisible();
  });

  it('should display all account information', async () => {
    await expect(element(by.id('username-label'))).toBeVisible();
    await expect(element(by.id('address-copy-to-clipboard'))).toBeVisible();
    // TODO: Test tokens are displayed
    // (details on https://github.com/LiskHQ/lisk-mobile/issues/1605).
  });

  it('should edit account name', async () => {
    await element(by.id('switch-account')).tap();
    await element(by.id('account-list-item')).atIndex(1).swipe('left');
    await element(by.id('edit-account')).atIndex(1).tap();
    await element(by.id('account-name')).atIndex(1).replaceText('tester');
    await element(by.id('edit-name-done-button')).atIndex(0).tap();
    await element(by.id('download-file-button')).atIndex(1).tap();
    await element(by.id('edit-account-button')).atIndex(0).tap();
    await element(by.id('switch-account')).tap();
    await expect(element(by.text('tester')).atIndex(1)).toBeVisible();
  });

  it('should remove account successfully', async () => {
    await element(by.id('account-list-item')).atIndex(1).swipe('left');
    await element(by.id('delete-account')).atIndex(1).tap();
    await element(by.id('download-file-button')).atIndex(1).tap();
    await element(by.id('delete-account-button')).atIndex(0).tap();
    await expect(element(by.id('secret-phrase')).atIndex(1)).toBeVisible();
  });

  it('should add account by file upload', async () => {
    await element(by.id('restore-from-file')).atIndex(1).tap();
    await element(by.id('decrypt-password-input')).tap();
    await element(by.id('decrypt-password-input')).replaceText('Password1!');
    await element(by.id('decrypt-button-continue')).tap();
    await expect(element(by.id('account-list-item')).atIndex(0)).toBeVisible();
  });

  it('should register new account', async () => {
    const recoveryPhraseArray = testConstants.secretRecoveryPhrase.split(' ');
    await element(by.id('add-account')).tap();
    await element(by.id('createAccountButton')).atIndex(1).tap();
    await element(by.id('understandResponsibilitySwitch')).tap();
    await element(by.id('safeKeepingButton')).tap();
    await element(by.id(`passphrasePlaceholderFor-${recoveryPhraseArray[0]}`)).tap();
    await element(by.id(`passphraseOptionFor-${recoveryPhraseArray[0]}`)).tap();
    await element(by.id(`passphrasePlaceholderFor-${recoveryPhraseArray[1]}`)).tap();
    await element(by.id(`passphraseOptionFor-${recoveryPhraseArray[1]}`)).tap();
    await element(by.id('registerConfirmButton')).atIndex(0).tap();
    await element(by.id('register-continue-button')).atIndex(0).tap();
    await expect(element(by.id('auth-method-screen')).atIndex(0)).toBeVisible();
  });

  describe('Derivation path', () => {
    it('should add an account with derivation path enabled', async () => {
      await element(by.id('derivation-switch')).tap();
      await element(by.id('secret-phrase')).tap();
      await expect(element(by.id('derivation-path-input'))).toBeVisible();
      await element(by.id('derivation-path-input')).replaceText('invalid-path');
      await expect(element(by.id('derivation-path-input-error'))).toBeVisible();
      await element(by.id('derivation-path-input')).replaceText(defaultDerivationPath);
      await element(by.id('signInPassphraseInput')).tap();
      await element(by.id('signInPassphraseInput')).replaceText(testConstants.secretRecoveryPhrase);
      await element(by.id('continue-button')).tap();
      await element(by.id('enter-password')).tap();
      await element(by.id('enter-password')).replaceText(testConstants.password);
      await element(by.id('confirm-password')).tap();
      await element(by.id('confirm-password')).replaceText(testConstants.password);
      await element(by.id('account-name')).tap();
      await element(by.id('account-name')).replaceText(testConstants.accountName);
      await element(by.id('agree-switch')).tap();
      await element(by.id('save-account')).tap();
      await element(by.id('download-file-button')).atIndex(0).tap();
      await element(by.id('result-screen-continue')).atIndex(0).tap();
      await expect(element(by.id('accounts-home-container'))).toBeVisible();
    });
  });
});
