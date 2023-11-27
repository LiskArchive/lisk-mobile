import { themes, colors } from 'constants/styleGuide';

export default function getCopyRecoveryPhraseToClipboardStyles() {
  return {
    common: {
      container: {
        padding: 8,
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
      },
      description: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 8,
      },
      copyTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      copyText: {
        color: colors.light.ultramarineBlue,
        fontSize: 12,
        fontWeight: '600',
      },
      icon: {
        paddingLeft: 8,
      },
      link: {
        fontSize: 12,
        textDecorationLine: 'underline',
      },
    },
    [themes.light]: {
      description: {
        color: colors.light.zodiacBlue,
      },
      link: {
        color: colors.light.ultramarineBlue,
      },
    },
    [themes.dark]: {
      description: {
        color: colors.dark.mountainMist,
      },
      link: {
        color: colors.dark.ultramarineBlue,
      },
    },
  };
}
