import { colors, themes, fonts } from 'constants/styleGuide';

export default function getDeleteAccountFormStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        flex: 1,
      },
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      modalDescription: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
        maxWidth: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      screenDescription: {
        textAlign: 'left',
        marginBottom: 8,
        fontSize: 14,
        lineHeight: 24,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      addressContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
      },
      filenameContainer: {
        marginTop: 16,
      },
      accountNameText: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: '500',
      },
      addressText: {
        fontSize: 14,
        marginTop: 8,
      },
      downloadFileIcon: {
        marginLeft: 8,
      },
      text: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.small,
      },
      submitButton: {
        marginBottom: 8,
      },
    },
    [themes.light]: {
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.zodiacBlue,
      },
      accountNameText: {
        color: colors.light.zodiacBlue,
      },
      text: {
        color: colors.light.zodiacBlue,
      },
      addressText: {
        color: colors.light.blueGray,
      },
    },

    [themes.dark]: {
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.ghost,
      },
      accountNameText: {
        color: colors.dark.white,
      },
      text: {
        color: colors.light.white,
      },
      addressText: {
        color: colors.light.ghost,
      },
    },
  };
}
