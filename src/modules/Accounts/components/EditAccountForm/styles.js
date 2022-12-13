import { colors, themes } from 'constants/styleGuide';

export default function getEditAccountFormStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        flex: 1,
      },
      title: {
        textAlign: 'center',
        marginBottom: 16,
      },
      illustration: {
        marginBottom: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      inputContainer: {
        marginBottom: 24,
      },
      modalDescription: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
        maxWidth: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      screenDescription: {
        textAlign: 'left',
        marginBottom: 8,
        fontSize: 14,
        lineHeight: 24,
      },
      submitButton: {
        marginBottom: 8,
      },
    },
    [themes.light]: {
      title: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      title: {
        color: colors.dark.white,
      },
    },
  };
}
