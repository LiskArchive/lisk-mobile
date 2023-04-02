/* eslint-disable max-statements */
import { device, element, by, waitFor } from 'detox';
import testConstants from '../utils/testConstants';

// TODO: Fix settings end to end test
// (details on https://github.com/LiskHQ/lisk-mobile/issues/1604).
describe('Send Token Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
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
      .withTimeout(5000);
    await element(by.id('download-file-button')).atIndex(0).tap();
    await element(by.id('result-screen-continue')).atIndex(0).tap();
  });

  it('should navigate to send token screen', async () => {
    await element(by.id('send-tokens-tab')).tap();
    await expect(element(by.id('send-token-screen'))).toBeVisible();
  });

  it('should send token to address', async () => {
    await element(by.id('recipient-address')).replaceText(testConstants.address);
    await element(by.id('next-step-button')).tap();
    await expect(element(by.id('select-token-step-screen'))).toBeVisible();
  });
});
