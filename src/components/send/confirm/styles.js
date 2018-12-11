import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (deviceType() === 'android' ? tabBarHeight() : 0) + 24,
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
    },
    input: {
      paddingRight: boxes.boxPadding,
      borderRightWidth: boxes.boxPadding,
      borderRightColor: 'transparent',
      fontSize: 13,
      letterSpacing: 1,
      fontFamily: fonts.family.passphrase,
    },
    headings: {
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      paddingTop: 36,
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
    sticky: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'yellow',
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    title: {
      color: colors.light.black,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    title: {
      color: colors.dark.white,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
  },
});
