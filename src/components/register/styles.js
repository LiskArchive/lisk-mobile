import { StyleSheet, Platform, DeviceInfo } from 'react-native';
import { colors } from '../../constants/styleGuide';

const navigatorHeight = 75 + (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated ? 23 : 0);

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.grayScale4,
    paddingBottom: navigatorHeight,
  },
  back: {
    color: 'black',
  },
  multiStepWrapper: {
    height: '100%',
  },
  multiStepNavWrapper: {
    height: navigatorHeight,
    width: '100%',
    position: 'absolute',
    bottom: -1 * navigatorHeight,
    left: 0,
    paddingTop: 24,
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
    width: 52,
    height: 3,
    fontSize: 1,
    color: 'transparent',
    marginTop: 14,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: colors.grayScale3,
  },
  disabledNavButton: {
    backgroundColor: colors.black,
  },
  activeGroupTitle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 8,
  },
  logo: {
    lineHeight: 40,
    top: -11,
  },
};

export default StyleSheet.create(styles);
