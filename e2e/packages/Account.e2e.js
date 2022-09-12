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

  it('should render empty illustration if no activity', async () => {
    await element(by.id('signInPassphraseInput')).atIndex(1).tap();
    await element(by.id('signInPassphraseInput'))
      .atIndex(1)
      .replaceText(testConstants.emptyAccount);
    await element(by.id('signInButton')).atIndex(1).tap();
    await element(by.text('Got it')).tap();
    await expect(element(by.id('empty-transaction-list'))).toExist();
  });

  it('should show activity list', async () => {
    await device.reloadReactNative();
    await element(by.id('signInPassphraseInput')).tap();
    await element(by.id('signInPassphraseInput')).replaceText(testConstants.account);
    await element(by.id('signInButton')).tap();
    await expect(element(by.id('transactions-list-manager'))).toExist();
  });
});
