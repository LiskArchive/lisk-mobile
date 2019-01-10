import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (deviceType() === 'android' ? tabBarHeight() : 0) + 24,
    },
    titleContainer: {
      margin: boxes.boxPadding,
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
      right: 6,
      zIndex: 99,
      top: 46,
      paddingRight: 15,
      paddingLeft: 10,
      paddingBottom: 10,
      width: 80,
      height: 30,
    },
    scanButtonTitle: {
      fontSize: 14,
      width: 39,
      paddingLeft: 5,
      color: colors.light.blue,
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
