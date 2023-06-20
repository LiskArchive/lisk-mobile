/* eslint-disable max-statements */
import { device, element, by } from 'detox';
import { signInUser } from '../commands/auth';

describe.skip('Request Token Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
    await signInUser();
  });

  it('should navigate to request token screen', async () => {
    await element(by.id('request-tokens-button')).tap();
    await expect(element(by.id('request-token-screen'))).toBeVisible();
  });

  it('should copy link without amount', async () => {
    device.reloadReactNative();
    await element(by.id('request-token-link-button')).tap();
    await expect(element(by.text('Link copied!'))).toBeVisible();
  });

  it('should copy link with amount pre-filled', async () => {
    device.reloadReactNative();
    await element(by.id('request-token-link-button')).tap();
    await element(by.id('token-amount')).typeText('0.10');
    await element(by.id('request-token-link-button')).tap();
    await expect(element(by.text('Link copied!'))).toBeVisible();
  });

  it('should copy link with message', async () => {
    device.reloadReactNative();
    await element(by.id('request-token-link-button')).tap();
    await element(by.id('token-amount')).typeText('0.10');
    await element(by.id('show-message-input')).tap();
    await element(by.id('message-input')).typeText('a very nice message');
    await element(by.id('request-token-link-button')).tap();
    await expect(element(by.text('Link copied!'))).toBeVisible();
  });
});
