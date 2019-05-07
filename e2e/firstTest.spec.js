/* eslint no-undef: 0 */
describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have the form', async () => {
    const form = element(by.id('signInForm'));
    await waitFor(form).toExist().withTimeout(3000);
    await expect(form).toExist();
  });
});
