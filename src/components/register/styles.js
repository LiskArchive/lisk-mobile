import { StyleSheet, Platform, DeviceInfo } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.grayScale4,
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
    width: 80,
    height: 31,
    fontSize: 1,
    color: 'transparent',
    borderWidth: 14,
    backgroundColor: colors.grayScale5,
    borderColor: colors.grayScale4,
  },
  disabledNavButton: {
    backgroundColor: colors.black,
  },
  activeGroupTitle: {
    width: '100%',
    textAlign: 'center',
  },
};

export default StyleSheet.create(styles);
