import { themes, colors, fonts } from 'constants/styleGuide';

export default function getExternalBlockchainApplicationRowStyles() {
  return {
    common: {
      container: {
        flexDirection: 'column',
        flex: 1,
      },
      applicationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      },
      applicationNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
      },
      applicationLogoImage: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      applicationNameLabel: {
        fontSize: fonts.size.base,
        fontWeight: '600',
      },
      resultDescription: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
        textAlign: 'center',
        marginBottom: 16,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      applicationNameLabel: {
        color: colors.light.zodiacBlue,
      },
      resultDescription: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      applicationNameLabel: {
        color: colors.light.platinum,
      },
      resultDescription: {
        color: colors.dark.ghost,
      },
    },
  };
}
