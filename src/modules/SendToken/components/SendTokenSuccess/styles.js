import { themes, colors, fonts } from 'constants/styleGuide';

export default function getSendTokenSuccessStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      title: {
        textAlign: 'center',
        fontSize: fonts.size.h4,
        fontWeight: '700',
        marginBottom: 16,
      },
      description: {
        textAlign: 'center',
        fontSize: fonts.size.base,
      },
      illustrationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
      },
      illustration: {
        marginBottom: 24,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
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
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.slateGray,
      },
    },
  };
}
