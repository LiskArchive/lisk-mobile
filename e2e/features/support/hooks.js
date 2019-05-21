/* eslint-disable */
const { Before, BeforeAll, AfterAll } = require('cucumber');
const detox = require('detox');
const config = require('../../../package').detox;

BeforeAll({timeout: 120 * 1000}, async () => {
  await detox.init(config, { launchApp: true });
  await element(by.id('skipIntroButton')).tap();
});

Before({ timeout: 120 * 1000 }, async () => {
  await device.launchApp({ newInstance: true });
});

AfterAll(async () => {
  await detox.cleanup();
});
