import { device, element, by } from 'detox';

describe('Intro Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load intro screen', async () => {
    await expect(element(by.text('Activity history'))).toBeVisible();
  });

  it('should show token transfer intro screens when swiped on', async () => {
    await element(by.id('intro-screen')).swipe('left');
    await expect(element(by.text('Token transfer'))).toBeVisible();
    await element(by.id('intro-screen')).swipe('left');
    await expect(element(by.text('Secure authentication'))).toBeVisible();
    await element(by.id('intro-screen')).swipe('left');
    await expect(element(by.text('Easy access'))).toBeVisible();
  });
});
