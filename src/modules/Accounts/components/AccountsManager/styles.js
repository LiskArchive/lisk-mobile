import {
  colors, themes, boxes, fonts
} from 'constants/styleGuide';

export default function getAccountsManagerStyles() {
  return {
    common: {
      container: {
        flex: 1,
        width: '100%',
      },
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      description: {
        textAlign: 'center',
        marginBottom: 24,
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
        minHeight: 48,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      addressContainer: {
        marginTop: 24,
        marginBottom: 16,
      },
      filenameContainer: {
        marginTop: 16,
      },
      addressText: {
        fontSize: 14,
        marginLeft: 8
      },
      downloadFileIcon: {
        marginLeft: 8,
      },
      text: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.small
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
      text: {
        color: colors.light.zodiacBlue
      },
      addressText: {
        color: colors.light.blueGray
      }
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black
      },
      outline: {
        borderColor: colors.light.volcanicSand,
      },
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.ghost,
      },
      text: {
        color: colors.light.white
      },
      addressText: {
        color: colors.light.ghost
      }
    }
  };
}
