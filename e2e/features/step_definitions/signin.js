/* eslint-disable */
const { When, Then } = require('cucumber');

const passphrase =
  'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

When(/I sign in$/, async function() {
  await element(by.id('signInPassphraseInput'))
    .atIndex(0)
    .tap();
  await element(by.id('signInPassphraseInput'))
    .atIndex(0)
    .typeText(passphrase);
  await element(by.id('signInButton')).tap();
});

Then(/I am on Sign in screen/, async function() {
  await expect(
    element(by.id('signInPassphraseInput')).atIndex(0)
  ).toBeVisible();
});
