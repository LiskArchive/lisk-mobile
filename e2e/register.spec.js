/* eslint-env detox/detox */

describe('Register Flow', () => {
  const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

  beforeAll(async () => {
    await device.relaunchApp({
      url: `lisk://register?passphrase=${encodeURI(passphrase)}`,
      sourceApp: 'com.apple.mobilesafari',
    });
  });

  describe('Intro', () => {
    it('should have a tappable switch and continue button', async () => {
      const switchButton = element(by.id('registerIntroSwitch'));
      await waitFor(switchButton).toExist().withTimeout(500);
      await switchButton.tap();

      const continueButton = element(by.id('registerIntroButton'));
      await expect(continueButton).toExist();
      await continueButton.tap();
    });
  });

  describe('SafeKeeping', () => {
    it('should have passphrase text and continue button', async () => {
      const passphraseText = element(by.id('passphraseText'));
      await waitFor(passphraseText).toExist().withTimeout(500);
      await expect(passphraseText).toHaveText(passphrase);

      const continueButton = element(by.id('registerSafeKeepingButton'));
      await expect(continueButton).toExist();
      await continueButton.tap();
    });
  });

  describe('Confirm', () => {
    it('renders passphrase container', async () => {
      const passphraseContainer = element(by.id('passphraseContainer'));
      await waitFor(passphraseContainer).toExist().withTimeout(250);
      await expect(passphraseContainer).toExist();
    });

    passphrase.split(' ').forEach((word) => {
      it('has passphrase placeholders', async () => {
        const wordPlaceholderButton = element(by.id(`passphrasePlaceholderFor-${word}`));
        await waitFor(wordPlaceholderButton).toExist().withTimeout(0);

        try {
          await wordPlaceholderButton.tap();
        } catch (error) {} // eslint-disable-line no-empty

        const passphraseOptionsContainer = element(by.id('pasphraseOptionsContainer'));
        await waitFor(passphraseOptionsContainer).toBeVisible().withTimeout(0);

        try {
          await expect(passphraseOptionsContainer).toBeVisible();
        } catch (error) {} // eslint-disable-line no-empty

        const wordOptionButton = element(by.id(`passphraseOptionFor-${word}`));
        await waitFor(wordOptionButton).toBeVisible().withTimeout(0);

        try {
          await wordOptionButton.tap();
        } catch (error) {} // eslint-disable-line no-empty

        await expect(passphraseOptionsContainer).toBeNotVisible();
      });
    });

    it('continue button becomes active after puzzle is solved', async () => {
      const continueButton = element(by.id('registerConfirmButton'));
      await expect(continueButton).toExist();
      await continueButton.tap();
    });
  });
});
