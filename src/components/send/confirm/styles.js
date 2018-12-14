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
      fontSize: 13,
      letterSpacing: 1,
      fontFamily: fonts.family.passphrase,
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
