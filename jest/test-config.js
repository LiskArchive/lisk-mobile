module.exports = {
  displayName: 'Test',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '.+\\.(css|png|jpg|ttf)$': 'jest-transform-stub',
  },
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.js',
    '!./src/components/**/*.js',
  ],
};
