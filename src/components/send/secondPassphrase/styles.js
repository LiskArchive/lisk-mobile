import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (deviceType() === 'android' ? tabBarHeight() : 0) + 24,
    },
    inputContainer: {
      paddingTop: 0,
    },
    input: {
      borderRightWidth: boxes.boxPadding,
      borderRightColor: 'transparent',
      fontFamily: fonts.family.passphrase,
      textAlign: 'justify',
      paddingTop: 10,
      paddingBottom: 10,
      minHeight: 40,
    },
    scanButton: {
      position: 'absolute',
      zIndex: 99,
      top: -5,
      right: boxes.boxPadding + 5,
      width: 60,
    },
    scanButtonTitle: {
      fontSize: fonts.size.small,
      paddingLeft: 6,
    },
    longTitle: {
      right: boxes.boxPadding - 5,
      width: 90,
    },
    cameraRoll: {
      opacity: 0,
    },
    cameraOverlay: {
      opacity: 0,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
  },
});
