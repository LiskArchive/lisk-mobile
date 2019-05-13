/* eslint-env detox/detox */

describe('SignIn Flow', () => {
  const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  it('successful sign in', async () => {
    await expect(element(by.id('signInForm'))).toExist();
    await element(by.id('signInPassphraseInput')).typeText(passphrase);
    await element(by.id('signInButton')).tap();
    await expect(element(by.id('accountSummary')).atIndex(1)).toExist();
  });
});
