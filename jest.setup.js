import { NativeModules } from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: jest.fn().mockImplementation(({ children }) => children),
  Switch: jest.fn().mockImplementation(() => null)
}));

jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');

jest.mock('@react-navigation/stack', () => ({
  useHeaderHeight: jest.fn(),
  createStackNavigator: () => ({
    Navigator: jest.fn(),
    Screen: jest.fn()
  })
}));

jest.mock('@react-navigation/compat', () => ({ withNavigation: (component) => component }));

jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: jest.fn().mockImplementation(({ children }) => children)
}));

if (!global.setImmediate) {
  global.setImmediate = setTimeout;
}
