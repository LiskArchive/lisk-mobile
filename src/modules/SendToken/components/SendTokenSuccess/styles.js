import {
  themes, colors, fonts
} from 'constants/styleGuide';

export default function getSendTokenSuccessStyles() {
  return {
    common: {
      container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      },
      title: {
        textAlign: 'center',
        fontSize: fonts.size.h4,
        fontWeight: '700',
        marginBottom: 16
      },
      subtitle: {
        textAlign: 'center'
      },
      illustrationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48
      },
      illustration: {
        marginBottom: 24
      }
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
      }
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
    }
  };
}
