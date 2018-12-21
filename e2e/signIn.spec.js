/* eslint-env detox/detox */

describe('SignIn Flow', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  describe('Sign In Screen', () => {
    it('should have the form', async () => {
      const form = element(by.id('signInForm'));
      await waitFor(form).toExist().withTimeout(3000);
      await expect(form).toExist();
    });

    it('should have a tapable button', async () => {
      const button = element(by.id('signInButton'));
      await expect(button).toExist();
      await button.tap();
    });
  });
});
