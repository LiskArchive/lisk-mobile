/* eslint-disable max-statements */
import { device, element, by } from 'detox';
import testConstants from '../utils/testConstants';

// TODO: Fix settings end to end test
// (details on https://github.com/LiskHQ/lisk-mobile/issues/1604).
describe('Settings Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
  });

  it('should navigate to settings menu', async () => {
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
    await element(by.id('Settings-tab')).atIndex(0).tap();
    await expect(element(by.text('Security'))).toBeVisible();
  });

  it('should toggle discrete mode', async () => {
    await element(by.id('enable-incognito-target')).atIndex(0).tap();
    await element(by.id('AccountHome-tab')).atIndex(0).tap();
    await expect(element(by.id('amount-blur')).atIndex(0)).toBeVisible();
  });

  it('should toggle dark/light mode', async () => {
    await element(by.id('Settings-tab')).atIndex(0).tap();
    await expect(element(by.id('light-mode')).atIndex(0)).toBeVisible();
    await element(by.id('dark-mode-target')).tap();
    await expect(element(by.id('dark-mode')).atIndex(0)).toBeVisible();
  });

  it('should change currency for conversion', async () => {
    await element(by.id('enable-incognito-target')).atIndex(0).tap();
    await element(by.id('currency')).tap();
    await element(by.text('CHF')).tap();
    await element(by.id('header-left-icon')).atIndex(0).tap();
    await element(by.id('AccountHome-tab')).atIndex(0).tap();
    await expect(element(by.id('token-currency-CHF'))).toBeVisible();
  });

  it('should open about Lisk', async () => {
    await element(by.id('Settings-tab')).atIndex(0).tap();
    await element(by.id('about')).tap();
    await expect(element(by.id('about-screen'))).toBeVisible();
  });

  it('should open Terms of use', async () => {
    await element(by.id('header-left-icon')).atIndex(0).tap();
    await element(by.id('terms')).tap();
    await expect(element(by.id('terms-screen'))).toBeVisible();
  });

  it('should open Privacy Policy', async () => {
    await element(by.id('header-left-icon')).atIndex(0).tap();
    await element(by.id('privacy')).tap();
    await expect(element(by.id('privacy-screen'))).toBeVisible();
  });
});
