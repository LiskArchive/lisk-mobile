import { themes, colors, fonts } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    inputLabel: {
      fontSize: fonts.size.input,
    },
    input: {
      fontSize: fonts.size.h1,
    },
    currencyContainer: {
      position: 'absolute',
      zIndex: 99,
      right: 20,
      top: 57,
    },
    currencyText: {
      fontSize: fonts.size.input,
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
