import { themes, colors, boxes } from '../../../../constants/styleGuide';

export default () => ({
  common: {
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
  },

  [themes.light]: {
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
