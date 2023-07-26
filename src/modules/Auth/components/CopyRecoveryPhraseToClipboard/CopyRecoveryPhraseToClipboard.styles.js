import { themes, colors, fonts } from 'constants/styleGuide';

export default function getCopyRecoveryPhraseToClipboardStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
      },
      copyTextContainer: {
        alignItems: 'center',
        marginTop: 32,
      },
      copyText: {
        color: colors.light.ultramarineBlue,
        fontSize: fonts.size.base,
        fontWeight: '600',
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      description: {
        color: colors.light.smoothGray,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },

      description: {
        color: colors.dark.mountainMist,
      },
    },
  };
}
