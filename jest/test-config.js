module.exports = {
  displayName: 'Test',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.js',
    '!./src/components/**/*.js',
  ],
};
