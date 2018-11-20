import { themes, colors, fonts } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    inputLabel: {
      fontSize: 13,
    },
    input: {
      fontSize: 32,
    },
    currencyContainer: {
      position: 'absolute',
      zIndex: 99,
      right: 20,
      top: 58,
    },
    currencyText: {
      fontSize: 13,
      fontFamily: fonts.family.contextLight,
    },
  },

  [themes.light]: {
    currencyText: {
      color: colors.light.gray1,
    },
  },

  [themes.dark]: {
    currencyText: {
      color: colors.dark.gray4,
    },
  },
});
