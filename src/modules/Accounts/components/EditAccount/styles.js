import { colors, themes } from 'constants/styleGuide';

export default function getEditAccountStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      title: {
        textAlign: 'center',
        marginBottom: 16,
      },
      inputContainer: {
        marginBottom: 24,
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
