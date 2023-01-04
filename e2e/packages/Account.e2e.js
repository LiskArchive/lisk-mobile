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
    await expect(element(by.id('empty-transaction-list'))).toExist();
  });

  it.skip('should show activity list', async () => {
    await device.reloadReactNative();
    await element(by.id('signInPassphraseInput')).tap();
    await element(by.id('signInPassphraseInput')).replaceText(testConstants.account);
    await element(by.id('signInButton')).tap();
    await expect(element(by.id('transactions-list-manager'))).toExist();
  });
});
