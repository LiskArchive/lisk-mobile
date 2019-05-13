/* eslint-env detox/detox */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

describe('Register Flow', () => {
  const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

  beforeAll(async () => {
    await device.launchApp({
      url: `lisk://register?passphrase=${encodeURI(passphrase)}`,
      newInstance: true,
    });
  });

  it('successful registration', async () => {
    await element(by.id('registerIntroSwitch')).tap();
    await element(by.id('registerIntroContinueButton')).tap();
    await expect(element(by.id('passphraseText'))).toExist();
    await element(by.id('registerSafeKeepingButton')).tap();
    for (const word of passphrase.split(' ')) {
      try {
        await element(by.id(`passphrasePlaceholderFor-${word}`)).tap();
        await element(by.id(`passphraseOptionFor-${word}`)).tap();
      } catch (error) {
        // } // eslint-disable-line no-empty
      }
    }
    await element(by.id('registerConfirmButton')).tap();
    await element(by.id('registerInitializationButton')).tap();
    await expect(element(by.id('registerSuccess'))).toExist();
  });
});
