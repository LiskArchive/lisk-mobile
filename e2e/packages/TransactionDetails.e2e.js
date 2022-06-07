import { device, element, by } from 'detox';
import testConstants from '../utils/testConstants';

describe('Transaction Details', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('sliderButton')).tap();
    await element(by.id('continueButton')).tap();
  });

  it('should navigate to transaction details screen', async () => {
    await element(by.id('signInPassphraseInput')).atIndex(1).tap();
    await element(by.id('signInPassphraseInput')).atIndex(1).replaceText(testConstants.account);
    await element(by.id('signInButton')).atIndex(1).tap();
    await element(by.text('Got it')).tap();
    await element(by.id('transaction-item')).atIndex(0).tap();
    await expect(element(by.id('transaction-details'))).toExist();
  });

  it('should render transaction details correctly', async () => {
    await expect(element(by.text('Sender'))).toExist();
    await expect(element(by.text('Recipient'))).toExist();
    await expect(element(by.text('Amount'))).toExist();
    await expect(element(by.text('Confirmations'))).toExist();
    await expect(element(by.text('Transaction ID'))).toExist();
    await expect(element(by.text('Block Height'))).toExist();
    await expect(element(by.text('Block ID'))).toExist();
    await expect(element(by.text('Nonce'))).toExist();
  });
});
