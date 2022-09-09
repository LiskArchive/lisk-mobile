import { colors, themes } from 'constants/styleGuide'

export default function getAccountsListStyles() {
  return {
    common: {
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      description: {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 12,
      },
    },
    [themes.light]: {
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.ghost,
      },
    },
  }
}
