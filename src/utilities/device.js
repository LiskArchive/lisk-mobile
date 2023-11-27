import { Dimensions, Platform, NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

/**
 * Returns a simple string defining the device type
 *
 * @returns {String} - iOSx for iPhoneX, iOS for the rest of iPhones
 *  and android for all the android phones
 */
export const deviceType = () => {
  if (Platform.OS === 'ios' && DeviceInfo.hasNotch()) {
    return 'iOSx';
  }
  if (Platform.OS === 'ios' && !DeviceInfo.hasNotch()) {
    return 'iOS';
  }
  return 'android';
};

/**
 * @returns {Number} - The with of the screen
 */
export const deviceWidth = () => width;

/**
 * @returns {Number} - The height of the screen
 */
export const deviceHeight = () => height;

export const isSmallDevice = deviceHeight() <= 680;

export const SCREEN_HEIGHTS = {
  SM: 640, // 640
  MD: 960, // 960
  LG: 1200, // Rest
};

export const deviceLocale = () => {
  if (Platform.OS === 'ios') {
    const locale =
      parseInt(Platform.Version, 10) > 12
        ? NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.SettingsManager.settings.AppleLocale; // "fr_FR"
    return locale.substr(0, 2);
  }
  return NativeModules.I18nManager.localeIdentifier.substr(0, 2);
};
