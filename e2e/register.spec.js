/* eslint-env detox/detox */

describe('Register Flow', () => {
  const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

  beforeAll(async () => {
    await device.relaunchApp({
      url: `lisk://register?passphrase=${encodeURI(passphrase)}`,
      sourceApp: 'com.apple.mobilesafari',
    });
  });

  it('should have a tappable switch and continue button', async () => {
    const switchButton = element(by.id('registerIntroSwitch'));
    await waitFor(switchButton).toExist().withTimeout(500);
    await switchButton.tap();

    const continueButton = element(by.id('registerIntroButton'));
    expect(continueButton).toExist();
    await continueButton.tap();
  });

  it('should have passphrase text and continue button', async () => {
    const passphraseText = element(by.id('passphraseText'));
    await waitFor(passphraseText).toExist().withTimeout(500);
    const continueButton = element(by.id('registerSafeKeepingButton'));
    expect(continueButton).toExist();
    await continueButton.tap();
  });
});
