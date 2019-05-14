/* eslint-disable */
const { When, Then } = require('cucumber');

Then(/^the profile is visible$/, async function () {
  await expect(element(by.id('accountSummary')).atIndex(1)).toExist();
});

