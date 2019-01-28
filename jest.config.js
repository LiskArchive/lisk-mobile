module.exports = {
  modulePaths: ['src/'],
  testMatch: [
    '<rootDir>/src/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    'src/components/',
  ],
  verbose: true,
  cache: false,
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/components/',
    'src/App.js',
    'src/constants/',
    'src/contexts/',
    'src/store/index.js',
    'src/store/middlewares/index.js',
    'src/store/reducers/index.js',
    'src/utilities/conversions.js',
    'src/utilities/device.js',
    'src/utilities/easing.js',
    'src/utilities/networks.js',
    'src/utilities/passphrase.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '.+\\.(css|png|jpg|ttf)$': 'jest-transform-stub',
  },
  preset: 'react-native',
  testURL: 'http://localhost',
  globals: {
    PRODUCTION: true,
    TEST: true,
  },
  coverageReporters: [
    'text',
    'html',
    'lcov',
    'cobertura',
  ],
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'jest tests', outputDirectory: '<rootDir>/coverage/jest' }],
  ],
};
