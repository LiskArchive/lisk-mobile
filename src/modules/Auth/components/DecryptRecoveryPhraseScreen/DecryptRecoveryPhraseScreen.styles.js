import { colors, themes, boxes } from 'constants/styleGuide';

export default function getDecryptRecoveryPhraseScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      form: {
        padding: boxes.boxPadding,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black,
      },
    },
  };
}
