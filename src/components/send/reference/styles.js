import { themes, colors, boxes } from '../../../constants/styleGuide';
import { deviceType, deviceHeight, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (
        (deviceType() === 'android' && deviceHeight() < 720) ? tabBarHeight() : 0
      ) + 24,
    },
    headerContainer: {
      paddingTop: 36,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    subHeader: {
      marginTop: 5,
    },
    form: {
      marginTop: 20,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    form: {
      borderTopWidth: 2,
      borderColor: colors.light.boxBg,
    },
    header: {
      color: colors.light.black,
    },
    subHeader: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    subHeader: {
      color: colors.dark.gray4,
    },
  },
});
