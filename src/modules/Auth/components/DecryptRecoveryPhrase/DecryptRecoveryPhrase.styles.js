import { themes, colors } from 'constants/styleGuide';

export default function getDecryptRecoveryPhraseStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      description: {
        textAlign: 'center',
        marginBottom: 24,
      },
    },

    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      username: {
        color: colors.light.zodiacBlue,
      },
      address: {
        color: colors.light.silverGrey,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      username: {
        color: colors.dark.ghost,
      },
      address: {
        color: colors.light.whiteSmoke,
      },
      title: {
        color: colors.light.white,
      },
      description: {
        color: colors.light.white,
      },
    },
  };
}
