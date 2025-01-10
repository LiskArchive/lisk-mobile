import { colors, themes } from 'constants/styleGuide';

export default function getAccountsListStyles() {
  return {
    common: {
      container: {
        flex: 1,
        height: '100%',
      },
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      description: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 12,
        maxWidth: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      footer: {
        marginTop: 24,
      },
      checkBox: {
        marginBottom: 24,
      },
      checkBoxText: {
        fontSize: 16,
        color: colors.light.smoothGray,
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
  };
}
