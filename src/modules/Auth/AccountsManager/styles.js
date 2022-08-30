import { colors, themes, boxes } from 'constants/styleGuide';

export default function getAccountsManagerStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      description: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 12
      },
      body: {
        paddingTop: boxes.boxPadding
      },
      bottom: {
        padding: boxes.boxPadding,
        marginBottom: boxes.boxPadding,
      },
      button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
      },
      icon: {
        width: 30
      },
      outline: {
        borderWidth: 1,
        borderRadius: 5,
        minHeight: 50,
      },
    },
    [themes.light]: {
      outline: {
        borderColor: colors.light.platinumGray,
      },
      container: {
        backgroundColor: colors.dark.white
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.zodiacBlue,
      },
      remove: {
        color: colors.light.zodiacBlue,
      }
    },

    [themes.dark]: {
      outline: {
        borderColor: colors.light.volcanicSand,
      },
      container: {
        backgroundColor: colors.dark.black
      },
      title: {
        color: colors.dark.ghost,
      },
      description: {
        color: colors.dark.ghost,
      },
      remove: {
        color: colors.light.white,
      }
    }
  };
}
