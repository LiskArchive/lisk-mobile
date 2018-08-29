import { Platform, DeviceInfo, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

const { width, height } = Dimensions.get('window');

/**
 * Returns a simple string defining the device type
 *
 * @returns {String} - iOSx for iPhoneX, iOS for the rest of iPhones
 *  and android for all the android phones
 */
export const deviceType = () => {
  if (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) {
    return 'iOSx';
  } else if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
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

/**
 * @returns {Number} - The height of the header
 */
export const headerHeight = () => {
  if (DeviceInfo.isIPhoneX_deprecated) {
    return Header.HEIGHT + 23;
  }
  return Header.HEIGHT;
};

/**
 * @returns {Number} - The height of the view under the header and above the tabs bar
 */
export const viewportHeight = () =>
  deviceHeight() - headerHeight() - 56 - (deviceType() === 'iOSx' ? 24 : 0);
