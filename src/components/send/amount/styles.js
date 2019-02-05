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
      margin: boxes.boxPadding,
    },
    balanceContainer: {
      flexDirection: 'row',
      padding: boxes.boxPadding,
      marginBottom: 5,
      alignItems: 'center',
    },
    balanceContainerIncognito: {
      paddingTop: boxes.boxPadding - 2,
      paddingBottom: boxes.boxPadding - 2,
    },
    balanceText: {
      fontSize: 14,
      paddingRight: 4,
    },
    balanceNumber: {
      fontSize: 14,
    },
    balanceIncognito: {
      width: 80,
      height: 20,
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
