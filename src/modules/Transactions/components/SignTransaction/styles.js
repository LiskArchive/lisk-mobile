import { themes, colors, fonts, boxes } from 'constants/styleGuide';

export function getSignTransactionSuccessStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
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

export function getSignTransactionErrorStyles() {
  return {
    common: {
      container: {
        flex: 1,
        width: '100%',
        padding: boxes.boxPadding,
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
      actionLabel: {
        textAlign: 'center',
        fontSize: fonts.size.base,
      },
      tryAgainButton: {
        marginTop: 24,
        marginBottom: 24,
      },
      illustrationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
      actionLabel: {
        color: colors.light.slateGray,
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
      actionLabel: {
        color: colors.dark.slateGray,
      },
    },
  };
}
