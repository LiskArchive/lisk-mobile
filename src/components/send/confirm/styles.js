import { DeviceInfo } from 'react-native';
import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: boxes.boxPadding,
      paddingBottom: 24,
    },
    button: {
      bottom: 100,
    },
    buttonSticky: {
      borderRadius: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    input: {
      paddingRight: boxes.boxPadding,
      borderRightWidth: boxes.boxPadding,
      borderRightColor: 'transparent',
      fontSize: 13,
      letterSpacing: 1,
      fontFamily: fonts.family.passphrase,
    },
    illustrationWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 36,
      paddingBottom: 8,
    },
    illustration: {
      width: 85,
      height: 85,
    },
    visible: {
      opacity: 1,
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
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
  },
});
