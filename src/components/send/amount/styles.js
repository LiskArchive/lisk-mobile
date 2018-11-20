import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {},
    container: {},
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: 24,
    },
    headerContainer: {
      paddingTop: 36,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    balanceContainer: {
      marginTop: 20,
      marginBottom: 5,
      paddingTop: 18,
      paddingBottom: 18,
      paddingRight: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      flexDirection: 'row',
    },
    subHeader: {
      marginTop: 5,
    },
    balanceText: {
      fontSize: 14,
    },
    balanceNumber: {
      fontSize: 14,
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
