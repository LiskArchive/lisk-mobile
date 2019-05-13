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
      fontFamily: fonts.family.passphrase,
      textAlign: 'justify',
      paddingTop: 10,
      paddingBottom: 10,
      minHeight: 40,
    },
    scanButton: {
      position: 'absolute',
      zIndex: 99,
      top: 15,
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
    container: {
      paddingVertical: boxes.boxPadding,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    scanButtonTitle: {
      color: colors.light.maastrichtBlue,
    },
    label: {
      color: colors.light.maastrichtBlue,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    scanButtonTitle: {
      color: colors.light.platinum,
    },
    label: {
      color: colors.light.platinum,
    },
  },
});
