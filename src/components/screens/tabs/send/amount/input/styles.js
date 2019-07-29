import { themes, colors, fonts } from '../../../../../../constants/styleGuide';

export default () => ({
  common: {
    input: {
      fontSize: 18,
    },
    currencyContainer: {
      position: 'absolute',
      zIndex: 99,
      right: 20,
      top: 20,
    },
    currencyText: {
      fontSize: fonts.size.input,
      fontFamily: fonts.family.context,
    },
    currencyPrefix: {
      fontSize: 16,
    },
  },

  [themes.light]: {
    currencyText: {
      color: colors.light.slateGray,
    },
    label: {
      color: colors.light.maastrichtBlue,
    },
  },

  [themes.dark]: {
    currencyText: {
      color: colors.light.blueGray,
    },
    label: {
      color: colors.light.platinum,
    },
  },
});
