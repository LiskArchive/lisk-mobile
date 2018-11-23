import { themes, colors, boxes } from '../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (deviceType() === 'android' ? tabBarHeight() : 0) + 24,
    },
    headerContainer: {
      paddingTop: 36,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    subHeader: {
      marginTop: 5,
    },
    balanceContainer: {
      marginTop: 20,
      paddingTop: 18,
      paddingBottom: 18,
      paddingRight: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      flexDirection: 'row',
    },
    balanceText: {
      fontSize: 14,
    },
    balanceNumber: {
      fontSize: 14,
    },
    form: {
      marginTop: 5,
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
    header: {
      color: colors.light.black,
    },
    subHeader: {
      color: colors.light.gray2,
    },
    balanceContainer: {
      backgroundColor: colors.light.sendBalanceBg,
    },
    balanceText: {
      color: colors.light.gray2,
    },
    balanceNumber: {
      color: colors.light.blue,
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
    balanceContainer: {
      backgroundColor: colors.dark.sendBalanceBg,
    },
    balanceText: {
      color: colors.dark.white,
    },
    balanceNumber: {
      color: colors.dark.blue,
    },
  },
});
