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
      button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
      },
      outline: {
        borderWidth: 1,
        borderRadius: 5,
        minHeight: 50,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white
      },
      outline: {
        borderColor: colors.light.platinumGray,
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
        backgroundColor: colors.dark.black
      },
      outline: {
        borderColor: colors.light.volcanicSand,
      },
      title: {
        color: colors.dark.ghost,
      },
      description: {
        color: colors.dark.ghost,
      },
    }
  };
}
