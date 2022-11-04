import { themes, colors, fonts } from 'constants/styleGuide';

export default function getBlockchainApplicationRowStyles() {
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
        maxWidth: '90%',
        marginRight: 15,
        fontWeight: '600',
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
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      applicationContainer: {
        borderBottomColor: colors.dark.volcanicSand,
      },
      applicationNameLabel: {
        color: colors.light.platinum,
      },
    },
  };
}
