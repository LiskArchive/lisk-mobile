module.exports = {
  modulePaths: ['src/'],
  testMatch: ['<rootDir>/src/**/*.test.js'],
  testPathIgnorePatterns: ['<rootDir>/src/components/', '<rootDir>/e2e/'],
  verbose: true,
  cache: false,
  moduleFileExtensions: ['js', 'tsx'],
  moduleDirectories: ['node_modules'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  collectCoverageFrom: ['src/**/*.js'],
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
  setupFiles: [
    './testenv.js',
    // necessary file for react-native-netinfo
    // src: https://github.com/react-native-community/react-native-netinfo#errors-while-running-jest-tests
    './jest.setup.js',
  ],
  testURL: 'http://localhost',
  globals: {
    PRODUCTION: true,
    TEST: true,
  },
  preset: 'react-native',
  coverageReporters: ['text', 'html', 'lcov', 'cobertura'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native-community|react-native)/)',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'jest tests', outputDirectory: '<rootDir>/coverage/jest' },
    ],
  ],
};
