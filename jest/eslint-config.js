module.exports = {
  preset: 'react-native',
  displayName: 'Lint',
  runner: 'jest-runner-eslint',
  testMatch: ['**/*.js'],
  testPathIgnorePatterns: ['/build/', '/coverage/', '/node_modules/', 'src/assets/'],
};
