/* eslint-disable */
const { When, Then } = require('cucumber');

Then(/I am on profile screen$/, async function() {
  await expect(element(by.id('accountSummary')).atIndex(1)).toExist();
});
