import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../../constants/styleGuide';
import { deviceType } from '../../../utilities/device';

const { height } = Dimensions.get('window');
const navigatorHeight = 75 + (deviceType() === 'iOSx' ? 23 : 0);

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.light.white,
  },
  back: {
    color: 'black',
  },
  multiStepWrapper: {
    height: '100%',
  },
  multiStepNavWrapper: {
    height: height > 640 ? navigatorHeight : 0,
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
    backgroundColor: colors.light.ghost,
    zIndex: 5,
  },
  disabledNavButton: {
    backgroundColor: colors.light.black,
  },
  activeGroupTitle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    width: 60,
    height: 40,
    marginTop: Platform.OS === 'ios' ? -4 : 8,
  },
  logo: {
    lineHeight: 40,
    top: -11,
  },
  progressStepContainer: {
    backgroundColor: colors.light.ghost,
  },
};

export default StyleSheet.create(styles);
