const crypto = require('crypto');

const sha1 = data =>
  crypto.createHash('sha1').update(data, 'binary').digest('hex');

module.exports = {
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: (ns, value) => sha1(value),
    },
    lngs: ['en', 'de'],
    ns: [
      'locale',
      'resource',
    ],
    defaultLng: 'en',
    defaultNs: 'resource',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'i18n/{{lng}}/{{ns}}.json',
      savePath: 'i18n/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    // interpolation: {
    //   prefix: '{{',
    //   suffix: '}}',
    // },
  },
};
