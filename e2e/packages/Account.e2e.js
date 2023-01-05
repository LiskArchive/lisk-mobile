/* eslint-disable max-statements */
import { device, element, by } from 'detox';
import testConstants from '../utils/testConstants';

describe('Accounts Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('sliderButton')).tap();
    await element(by.id('continueButton')).tap();
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
    // TODO: Download passphrase before selecting account
    await element(by.id('account-list-item')).atIndex(0).tap();
    await expect(element(by.id('accounts-home'))).toBeVisible();
  });

  it('should display all account information', async () => {
    await expect(element(by.id('username'))).toBeVisible();
    await expect(element(by.id('address'))).toBeVisible();
    // TODO: Test tokens are displayed
  });

  it('should show activity list', async () => {
    await expect(element(by.id('transaction-list'))).toBeVisible();
    // TODO: Test transactions are rendered
  });
});
