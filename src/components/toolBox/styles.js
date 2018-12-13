import { StyleSheet, DeviceInfo, Platform } from 'react-native';
import { fonts, colors, boxes } from '../../constants/styleGuide';
import { viewportHeight } from '../../utilities/device';

const bottomOffset = DeviceInfo.isIPhoneX_deprecated ? 30 : 0;

const styles = {
  h1: {
    color: colors.light.black,
    fontSize: fonts.size.h1,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h2: {
    color: colors.light.black,
    fontSize: fonts.size.h2,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h3: {
    color: colors.light.black,
    fontSize: fonts.size.h3,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h4: {
    color: colors.light.black,
    fontSize: fonts.size.h4,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  p: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  b: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
    fontWeight: 'bold',
  },
  span: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  small: {
    fontSize: fonts.size.small,
    fontFamily: fonts.family.context,
  },
  a: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  inputLabel: {
    color: colors.light.gray1,
    fontFamily: fonts.family.contextLight,
    fontSize: fonts.size.input,
    fontWeight: '400',
  },
  inputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  input: {
    fontWeight: 'bold',
    color: colors.light.black,
    fontSize: fonts.size.input,
    fontFamily: fonts.family.contextSemiBold,
    // lineHeight: 30,
    minHeight: 30,
    width: '100%',
    borderBottomColor: colors.light.gray1,
    paddingBottom: 5,
    borderBottomWidth: 1,
    paddingTop: 5,
  },
  errorMessageContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    // marginLeft: 20,
    // paddingRight: 20,
  },
  errorMessage: {
    color: colors.light.gray1,
    fontFamily: fonts.family.context,
    marginBottom: 20,
    paddingTop: 0,
    marginLeft: 5,
    marginRight: 0,
    marginTop: 0,
    fontSize: fonts.size.input,
  },
  errorIcon: {
    color: colors.light.red,
  },
  inputErrorStyle: {
    borderBottomColor: colors.light.red,
  },
  passphraseInput: {
    color: 'black',
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: fonts.family.passphrase,
  },
  scrollViewContainer: {
    minHeight: viewportHeight(),
  },
  scrollViewInnerContainer: {
    height: '100%',
  },
  offKeyboardButton: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  keyboardStickyButton: {
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 1,
    marginLeft: -1,
    marginRight: -1,
    height: 47,
  },
  hasTabBar: {
    ...Platform.select({
      android: {
        top: -50,
      },
      ios: {
        marginBottom: DeviceInfo.isIPhoneX_deprecated ? -41 : -12,
      },
    }),
  },
  hiddenStickyButton: {
    bottom: -100,
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  pullUp: {
    ...Platform.select({
      android: {
        top: -20,
      },
      ios: {
        marginBottom: (20 + bottomOffset),
      },
    }),
  },
  overlay: {
    zIndex: 9999,
  },
  keyboard: {
    ...Platform.select({
      android: {
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        borderRadius: 0,
      },
      ios: {
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        height: 'auto',
        borderRadius: 0,
      },
    }),
  },
};

export default StyleSheet.create(styles);
