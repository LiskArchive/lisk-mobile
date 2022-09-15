import { themes, colors, fonts } from 'constants/styleGuide';

export default function getExternalApplicationListStyles() {
  return {
    common: {
      text: {
        fontSize: fonts.size.base,
        maxWidth: '90%',
        marginRight: 16,
        fontWeight: '600',
      },
    },
    [themes.light]: {
      text: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      text: {
        color: colors.light.platinum,
      },
    },
  };
}
