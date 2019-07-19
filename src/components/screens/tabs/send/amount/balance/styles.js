import { themes, colors, boxes } from '../../../../../../constants/styleGuide';

export default () => ({
  common: {
    balanceContainer: {
      flexDirection: 'column',
      paddingTop: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      marginBottom: 5,
    },
    balanceContainerIncognito: {
      paddingTop: boxes.boxPadding - 2,
      paddingBottom: boxes.boxPadding - 2,
    },
    balanceText: {
      fontSize: 13,
      paddingRight: 4,
    },
    balanceNumber: {
      fontSize: 16,
      color: colors.light.ultramarineBlue,
    },
    balanceIncognito: {
      width: 80,
      height: 20,
    },
  },

  [themes.light]: {
    balanceText: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    balanceText: {
      color: colors.dark.platinum,
    },
  },
});
