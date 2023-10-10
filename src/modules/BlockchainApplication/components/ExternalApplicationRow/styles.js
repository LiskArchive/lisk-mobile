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
        marginBottom: 4,
      },
      applicationUrlLabel: {
        fontSize: 12,
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
      applicationContainer: {
        borderBottomColor: colors.light.platinumGray,
      },
      applicationNameLabel: {
        color: colors.light.zodiacBlue,
      },
      applicationUrlLabel: {
        color: colors.light.blueGray,
      },
      resultDescription: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      applicationContainer: {
        borderBottomColor: colors.dark.volcanicSand,
      },
      applicationNameLabel: {
        color: colors.dark.platinum,
      },
      applicationUrlLabel: {
        color: colors.dark.mountainMist,
      },
      resultDescription: {
        color: colors.dark.ghost,
      },
    },
  };
}
