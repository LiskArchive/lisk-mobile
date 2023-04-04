/* eslint-disable max-statements */
import { device, element, by } from 'detox';
import testConstants from '../utils/testConstants';
import { signInUser } from '../commands/auth';

// TODO: Fix settings end to end test
// (details on https://github.com/LiskHQ/lisk-mobile/issues/1604).
describe('Send Token Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
    await signInUser();
  });

  it('should navigate to send token screen', async () => {
    await element(by.id('send-tokens-button')).tap();
    await expect(element(by.id('send-token-screen'))).toBeVisible();
  });

  it('should send token to address', async () => {
    await element(by.id('recipient-address')).replaceText(testConstants.address);
    await element(by.id('next-step-button')).tap();
    await expect(element(by.id('select-token-step-screen'))).toBeVisible();
    await element(by.id('token-amount')).typeText('0.01');
  });
});
