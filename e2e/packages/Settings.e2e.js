import { device, element, by } from 'detox';

describe('Settings Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('sliderButton')).tap();
    await element(by.id('continueButton')).tap();
  });

  it('should load settings screen', async () => {
    await element(by.id('signInPassphraseInput')).atIndex(1).tap();
    await element(by.id('signInPassphraseInput')).atIndex(1).replaceText('benefit era often time inch divorce cup rare kidney sting negative ritual');
    await element(by.id('signInButton')).atIndex(1).tap();
    await element(by.text('Got it')).tap();
    await element(by.text('Settings')).tap();
    await expect(element(by.text('Settings'))).toBeVisible();
  });
  it('should toggle discrete mode', async () => {
    
  })
  
  it('should toggle dark/light mode', async () => {
    
  })
  
  it('should toggle dark/light mode', async () => {
    
  })
  
  it('should change currency for conversion', async () => {

  })
  
  it('should open about Lisk', async () => {

  })
  
  it('should open Terms of use', async () => {

  })
  
  it('should sign out', async () => {

  })
});
