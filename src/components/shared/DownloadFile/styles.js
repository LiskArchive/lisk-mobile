import { colors, themes, fonts } from 'constants/styleGuide';

export default function getDeleteAccountFormStyles() {
  return {
    common: {
      container: {
        width: '100%',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      filenameContainer: {
        marginTop: 16,
      },
      text: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.small,
        marginLeft: 8,
        maxWidth: 320,
      },
      downloadFileIcon: {
        marginLeft: 6,
      },
    },
    [themes.light]: {
      text: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      text: {
        color: colors.light.white,
      },
    },
  };
}
