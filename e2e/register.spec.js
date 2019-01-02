/* eslint-env detox/detox */

describe('Register Flow', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('(SignIn Screen) should have the register button', async () => {
    const form = element(by.id('signInForm'));
    await waitFor(form).toExist().withTimeout(3000);

    const button = element(by.id('signInToRegisterButton'));
    await expect(button).toExist();
    await button.tap();
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
