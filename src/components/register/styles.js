import { StyleSheet, Platform, DeviceInfo } from 'react-native';

const styles = {
  container: {
    height: '100%',
  },
  back: {
    color: 'black',
  },
  multiStepWrapper: {
    height: '100%',
  },
  multiStepNavWrapper: {
    height: 40 + (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated ? 23 : 0),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  multiStepGroupWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiStepGroup: {
    height: '100%',
  },
  navButton: {
    width: 32,
    marginRight: 14,
    marginLeft: 14,
  },
};

export default StyleSheet.create(styles);
