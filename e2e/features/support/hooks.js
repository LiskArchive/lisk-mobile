const { Before, AfterAll } = require('cucumber');
const detox = require('detox');
const config = require('../../../package').detox;
// eslint-disable-line new-cap
Before({ timeout: 120 * 1000 }, async () => { // eslint-disable-line new-cap
  await detox.init(config, { reuse: true });
});

AfterAll(async () => { // eslint-disable-line new-cap
  await detox.cleanup();
});
