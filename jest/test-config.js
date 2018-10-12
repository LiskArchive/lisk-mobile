module.exports = {
  displayName: 'Test',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|png|jpg|ttf)$': 'jest-transform-stub',
  },
  // preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.js',
    '!./src/components/**/*.js',
  ],
};
