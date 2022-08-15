import {
  themes, colors, fonts
} from 'constants/styleGuide';

export default function getSendTokenErrorStyles() {
  return {
    common: {
      container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      },
      body: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
      },
      title: {
        textAlign: 'center',
        fontSize: fonts.size.h4,
        fontWeight: '700',
        marginBottom: 16
      },
      subtitle: {
        textAlign: 'center',
        marginBottom: 24
      },
      actionLabel: {
        textAlign: 'center',
        marginBottom: 16
      },
      tryAgainButton: {
        marginBottom: 24
      },
      illustrationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white
      },
      subtitle: {
        color: colors.light.slateGray
      },
      title: {
        color: colors.light.zodiacBlue
      },
      actionLabel: {
        color: colors.light.slateGray
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg
      },
      subtitle: {
        color: colors.dark.slateGray
      },
      title: {
        color: colors.dark.white
      },
      actionLabel: {
        color: colors.dark.slateGray
      },
    }
  };
}
