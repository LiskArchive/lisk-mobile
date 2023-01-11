/* eslint-disable max-statements */
import { device, element, by } from 'detox';
import testConstants from '../utils/testConstants';

describe('Bookmark Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('sliderButton')).tap();
    await element(by.id('continueButton')).tap();
    await element(by.id('restore-from-file')).atIndex(1).tap();
    await element(by.id('decrypt-password-input')).tap();
    await element(by.id('decrypt-password-input')).replaceText('Password1!');
    await element(by.id('decrypt-button-continue')).tap();
    await element(by.id('account-list-item')).atIndex(0).tap();
  });

  it('should validate errors in adding bookmarks', async () => {
    await element(by.id('Bookmarks-tab')).atIndex(0).tap();
    await element(by.id('add-bookmark')).tap();
    await element(by.id('add-bookmark-button')).tap();
    await expect(element(by.text('This field is required')).atIndex(0)).toBeVisible();
    await expect(element(by.text('This field is required')).atIndex(1)).toBeVisible();
    await element(by.id('bookmark-address-input')).tap();
    await element(by.id('bookmark-address-input')).replaceText('invalid address');
    await element(by.id('add-bookmark-button')).tap();
    await expect(element(by.text('Invalid address'))).toBeVisible();
    await element(by.id('bookmark-label-input')).tap();
    await element(by.id('bookmark-label-input')).replaceText('ho');
    await expect(element(by.text('The label must be between 3 to 20 characters'))).toBeVisible();
  });

  it('should add a bookmark successfully', async () => {
    await element(by.id('bookmark-address-input')).tap();
    await element(by.id('bookmark-address-input')).replaceText(testConstants.address);
    await element(by.id('bookmark-label-input')).tap();
    await element(by.id('bookmark-label-input')).replaceText('newbookmark');
    await element(by.id('add-bookmark-button')).tap();
    await expect(element(by.text('newbookmark'))).toBeVisible();
  });

  it('should edit a bookmark successfully', async () => {
    await element(by.text('newbookmark')).swipe('right');
    await element(by.id('edit-bookmark')).tap();
    await element(by.id('bookmark-label-input')).tap();
    await element(by.id('bookmark-label-input')).replaceText('edited');
    await element(by.id('add-bookmark-button')).tap();
    await expect(element(by.text('edited'))).toBeVisible();
  });
});
