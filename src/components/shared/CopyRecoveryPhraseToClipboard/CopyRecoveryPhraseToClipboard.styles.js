import { themes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

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
      container: {
        backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.1),
      },
      description: {
        color: colors.light.zodiacBlue,
      },
      link: {
        color: colors.light.ultramarineBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.2),
      },
      description: {
        color: colors.dark.mountainMist,
      },
      link: {
        color: colors.dark.ultramarineBlue,
      },
    },
  };
}
