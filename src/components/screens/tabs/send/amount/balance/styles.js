import { themes, colors, boxes } from '../../../../../../constants/styleGuide';

export default () => ({
  common: {
    balanceContainer: {
      flexDirection: 'column',
      marginTop: boxes.boxPadding,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      padding: 10,
      marginBottom: 5,
      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    balanceContainerIncognito: {
      paddingTop: boxes.boxPadding - 2,
      paddingBottom: boxes.boxPadding - 2
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
      fontSize: 13,
      color: colors.light.ultramarineBlue
    }
  },

  [themes.light]: {
    balanceContainer: {
      backgroundColor: colors.light.white,
      shadowColor: colors.light.black,
    },
    balanceText: {
      color: colors.light.inkBlue,
    }
  },
  [themes.dark]: {
    balanceContainer: {
      backgroundColor: colors.light.black,
      shadowColor: colors.light.whiteSmoke,
    },
    balanceText: {
      color: colors.dark.platinum,
    }
  }
});
