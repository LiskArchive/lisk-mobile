import { colors, themes, fonts } from 'constants/styleGuide';

export default function getDeleteAccountFormStyles() {
  return {
    common: {
      container: {
        flex: 1,
        width: '100%',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      filenameContainer: {
        marginTop: 16,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      downloadFileIcon: {
        marginRight: 8,
        paddingHorizontal: 10,
      },
      text: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.small,
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
