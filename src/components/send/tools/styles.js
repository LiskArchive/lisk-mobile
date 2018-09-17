import { StyleSheet, DeviceInfo } from 'react-native';

const styles = {
  iosKeyboard: {
    backgroundColor: 'transparent',
    height: 'auto',
    marginBottom: DeviceInfo.isIPhoneX_deprecated ? -39 : -9,
    borderRadius: 0,
  },
  androidKeyboard: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 9999,
    borderRadius: 0,
  },
  stickyButton: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
};

export default StyleSheet.create(styles);
