/* eslint-disable */
const { BeforeAll, AfterAll } = require('cucumber');
const detox = require('detox');
const config = require('../../../package').detox;

BeforeAll({ timeout: 120 * 1000 }, async () => {
  await detox.init(config, { launchApp: false });
});

AfterAll(async () => {
  await detox.cleanup();
});
