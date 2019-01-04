/* eslint-env detox/detox */

describe('SignIn Flow', () => {
  const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('should have the form', async () => {
    const form = element(by.id('signInForm'));
    await waitFor(form).toExist().withTimeout(3000);
    await expect(form).toExist();
  });

  it('should have a fillable input', async () => {
    const input = element(by.id('signInPassphraseInput'));
    await expect(input).toExist();
    await input.typeText(passphrase);
  });

  it('should have a tapable button', async () => {
    const button = element(by.id('signInButton'));
    await expect(button).toExist();
    await button.tap();
  });

  it('should complete sign in process and navigate to the home page', async () => {
    const accountSummary = element(by.id('accountSummary'));
    await waitFor(accountSummary).toExist().withTimeout(3000);
    await expect(accountSummary).toExist();
  });
});
