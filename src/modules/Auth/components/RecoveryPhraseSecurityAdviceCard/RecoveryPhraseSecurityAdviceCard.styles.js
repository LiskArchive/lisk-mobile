import { themes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export function getRecoveryPhraseSecurityAdviceCardStyles() {
  return {
    common: {
      container: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
      },
      description: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: setColorOpacity(colors.light.yellowCopacabana, 0.1),
        borderColor: setColorOpacity(colors.light.yellowCopacabana, 0.5),
      },
      description: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: setColorOpacity(colors.dark.yellowCopacabana, 0.1),
        borderColor: setColorOpacity(colors.dark.yellowCopacabana, 0.5),
      },
      description: {
        color: colors.dark.zodiacBlue,
      },
    },
  };
}
