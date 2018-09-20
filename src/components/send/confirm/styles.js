import { StyleSheet, DeviceInfo } from 'react-native';
import { colors, boxes, fonts } from '../../../constants/styleGuide';

const styles = {
  wrapper: {
    backgroundColor: colors.white,
  },
  container: {
    height: '100%',
  },
  innerContainer: {
    height: '100%',
    paddingTop: 36,
    paddingBottom: 24,
  },
  button: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
    bottom: 100,
  },
  buttonSticky: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  subtitle: {
    marginTop: 7,
    color: colors.grayScale2,
  },
  input: {
    paddingRight: boxes.boxPadding,
    borderRightWidth: boxes.boxPadding,
    borderRightColor: 'transparent',
    color: 'black',
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: fonts.family.passphrase,
  },
  headings: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  illustrationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 40,
  },
  illustration: {
    width: 85,
    height: 85,
  },
  visible: {
    opacity: 1,
  },
  allWhite: {
    borderTopColor: colors.white,
    backgroundColor: colors.white,
  },
  sticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
  },
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
};

export default StyleSheet.create(styles);
