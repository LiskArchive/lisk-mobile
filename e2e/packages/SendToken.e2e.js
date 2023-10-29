/* eslint-disable max-statements */
import { device, element, by, waitFor } from 'detox';
import testConstants from '../utils/testConstants';
import { signInUser } from '../commands/auth';

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

  it('should calculate initialization fee for new addresses', async () => {
    await element(by.id('recipient-address')).typeText(`${testConstants.newAddress}`);
    await element(by.id('send-token-screen')).tap();
    await element(by.id('token-amount')).typeText('0.01\n');
    await element(by.id('send-token-screen')).tap();
    await element(by.id('fees-breakdown-toggle')).tap();
    await element(by.id('send-token-screen')).atIndex(0).swipe('up');
    await expect(element(by.id('initialization-fee'))).toBeVisible();
  });

  it('should not add initialization fee for old addresses', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).tap();
    await element(by.id('send-tokens-button')).tap();
    await element(by.id('recipient-address')).typeText(`${testConstants.address}`);
    await element(by.id('send-token-screen')).tap();
    await element(by.id('token-amount')).typeText('0.01');
    await element(by.id('send-token-screen')).tap();
    await element(by.id('fees-breakdown-toggle')).tap();
    await element(by.id('send-token-screen')).atIndex(0).swipe('up');
    await expect(element(by.id('initialization-fee'))).not.toBeVisible();
    await element(by.id('next-step-button')).tap();
  });

  it('should show transaction summary screen', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).tap();
    await element(by.id('send-tokens-button')).tap();
    await element(by.id('recipient-address')).typeText(`${testConstants.address}`);
    await element(by.id('send-token-screen')).tap();
    await element(by.id('token-amount')).typeText('0.01\n');
    await element(by.id('send-token-screen')).tap();
    await element(by.id('fees-breakdown-toggle')).tap();
    await element(by.id('send-token-screen')).atIndex(0).swipe('up');
    await expect(element(by.id('initialization-fee'))).not.toBeVisible();
    await element(by.id('next-step-button')).tap();
    await expect(element(by.id('transaction-summary-screen'))).toBeVisible();
  });

  it('should successfully send a transaction', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).tap();
    await element(by.id('send-tokens-button')).tap();
    await element(by.id('recipient-address')).typeText(`${testConstants.address}`);
    await element(by.id('send-token-screen')).tap();
    await element(by.id('token-amount')).typeText('0.01\n');
    await element(by.id('send-token-screen')).tap();
    await element(by.id('fees-breakdown-toggle')).tap();
    await element(by.id('send-token-screen')).atIndex(0).swipe('up');
    await expect(element(by.id('initialization-fee'))).not.toBeVisible();
    await element(by.id('next-step-button')).tap();
    await waitFor(element(by.id('send-transaction-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('send-transaction-button')).tap();
    await expect(element(by.id('transaction-confirmation-screen'))).toBeVisible();
    await element(by.id('decrypt-password-input')).typeText(testConstants.password);
    await element(by.id('confirm-send-token-button')).tap();
    await expect(element(by.id('sign-transaction-success'))).toBeVisible();
  });

  it('should successfully send a transaction with 0 amount when amount input is left unchanged', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).tap();
    await element(by.id('send-tokens-button')).tap();
    await element(by.id('recipient-address')).typeText(`${testConstants.address}`);
    await element(by.id('send-token-screen')).tap();
    await element(by.id('fees-breakdown-toggle')).tap();
    await element(by.id('send-token-screen')).atIndex(0).swipe('up');
    await expect(element(by.id('initialization-fee'))).not.toBeVisible();
    await element(by.id('next-step-button')).tap();
    await waitFor(element(by.id('send-transaction-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('send-transaction-button')).tap();
    await expect(element(by.id('transaction-confirmation-screen'))).toBeVisible();
    await element(by.id('decrypt-password-input')).typeText(testConstants.password);
    await element(by.id('confirm-send-token-button')).tap();
    await expect(element(by.id('sign-transaction-success'))).toBeVisible();
  });

  // TODO: Fix cross-chain test
  it.skip('should successfully send a cross-chain transaction', async () => {
    device.reloadReactNative();
    await element(by.id('account-list-item')).tap();
    await element(by.id('send-tokens-button')).tap();
    await element(by.id('recipient-address')).typeText(`${testConstants.address}`);

    await element(by.id('send-token-screen')).tap();
    await element(by.id('to-application-select')).tap();

    await element(by.id('application-list-Enevti')).tap();
    await element(by.id('select-token-picker')).tap();
    await element(by.id('token-select-LSK')).tap();

    await element(by.id('send-token-screen')).atIndex(0).swipe('up');
    await element(by.id('next-step-button')).tap();

    await waitFor(element(by.id('send-transaction-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('send-transaction-button')).tap();
    await expect(element(by.id('transaction-confirmation-screen'))).toBeVisible();
    await element(by.id('decrypt-password-input')).typeText(testConstants.password);
    await element(by.id('confirm-send-token-button')).tap();
    await expect(element(by.id('sign-transaction-success'))).toBeVisible();
  });
});
