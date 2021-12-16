import { themes, colors, boxes } from '../../../../../../constants/styleGuide';

export default () => ({
  common: {
    balanceContainer: {
      flexDirection: 'column',
      marginTop: boxes.boxPadding,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
      marginBottom: 5,
      borderRadius: 5,
    },
    balanceText: {
      fontSize: 13,
      marginBottom: 5
    },
    balanceNumber: {
      fontSize: 18,
      color: colors.light.ultramarineBlue
    },
    balanceIncognito: {
      width: 80,
      height: 20
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    translated: {
      fontSize: 14,
      color: colors.light.ultramarineBlue
    }
  },

  [themes.light]: {
    balanceContainer: {
      backgroundColor: colors.light.white,
      borderColor: colors.light.platinum,
      borderWidth: 1,
    },
    balanceText: {
      color: colors.light.inkBlue,
    },
    balanceNumber: {
      color: colors.light.inkBlue,
    },
    translated: {
      color: `${colors.dark.inkBlue}B3`,
    },
  },
  [themes.dark]: {
    balanceContainer: {
      backgroundColor: colors.dark.headerBg,
    },
    balanceNumber: {
      color: colors.dark.platinum,
    },
    balanceText: {
      color: colors.dark.platinum,
    },
    translated: {
      color: colors.dark.platinum,
    },
  }
});
