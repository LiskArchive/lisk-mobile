import { device, element, by } from 'detox';

describe.skip('Intro Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load intro screen', async () => {
    await expect(element(by.text('Send and request tokens'))).toBeVisible();
  });

  it('should show token transfer intro screens when swiped on', async () => {
    await element(by.id('intro-screen')).swipe('left');
    await expect(element(by.text('A unique avatar'))).toBeVisible();
    await element(by.id('intro-screen')).swipe('left');
    await expect(element(by.text('Manage blockchain application assets'))).toBeVisible();
  });

  it('should navigate to add account screen after intro screen', async () => {
    await element(by.id('continueToAddAccountButton')).tap();
    await expect(element(by.id('add-account-title')).atIndex(1)).toBeVisible();
  });
});
