module.exports = {
  env: {
    development: {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        '@babel/plugin-transform-react-jsx-source',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'transform-class-properties',
      ],
    },
    production: {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        '@babel/plugin-transform-react-jsx-source',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'transform-class-properties',
      ],
    },
    test: {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        '@babel/plugin-transform-react-jsx-source',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'transform-class-properties',
      ],
    },
  },
};
