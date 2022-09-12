// react-native-device-info contains native code, and needs to be mocked.
jest.mock('react-native-device-info', () => ({
  getModel: jest.fn(),
  hasNotch: jest.fn(),
}));
