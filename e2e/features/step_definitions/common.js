/* eslint-disable */
const { When, Then, Given } = require('cucumber');

Given(/^I open the app$/, async function () {
  await device.launchApp({ newInstance: true });
});

Then(/^the following text is visible:$/, async function (table) {
  for (const [text] of table.raw()) {
    await expect(element(by.text(text))).toBeVisible();
  }
});

Then(/^the following elements are visible:$/, async function (table) {
  for (const [id] of table.raw()) {
    await expect(element(by.id(id)).atIndex(0)).toBeVisible();
  }
});

Then(/^the following elements exist:$/, async function (table) {
  for (const [id] of table.raw()) {
    await expect(element(by.id(id)).atIndex(0)).toExist();
  }
});

When(/^I tap element by id '(.+)'$/, async function (value) {
  await element(by.id(value)).atIndex(0).tap();
});

When(/^I tap element by text '(.+)'$/, async function (value) {
  await element(by.text(value)).atIndex(0).tap();
});

Then(/^text '(.+)' is visible$/, async function (value) {
  await expect(element(by.text(value)).atIndex(0)).toBeVisible();
});

When(/^I scroll '(.+)' pixels '(.+)'$/, async function (pixels, direction) {
  await element(by.id('scroll')).scroll(Number(pixels), direction);
});

When (/^I scroll to the '(.+)'$/, async function (edge) {
  await element(by.id('scroll')).scrollTo(edge);
});

When(/^type '(.*)' into element id '(.+)'$/, async function(string, elementId) {
  await element(by.id(elementId)).atIndex(0).tap();
  await element(by.id(elementId)).atIndex(0).typeText(string);
});

When(/^I manually.*$/, async function () {

});

Then(/^element by id '(.+)' is visible$/, async function (value) {
  await expect(element(by.id(value)).atIndex(0)).toBeVisible();
});

Then(/^text '(.+)' is not visible$/, async function (value) {
  await expect(element(by.text(value)).atIndex(0)).toBeNotVisible();
});
