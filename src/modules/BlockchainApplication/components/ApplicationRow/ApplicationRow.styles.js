import { themes, colors, fonts } from 'constants/styleGuide';

export default function getBlockchainApplicationRowStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
      },
      disabledContainer: {
        opacity: 0.5,
      },
      nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      logoImage: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      nameLabel: {
        fontSize: fonts.size.base,
        maxWidth: '90%',
        marginRight: 15,
        fontWeight: '600',
      },
      deleteDefaultApplicationModalFooter: {
        padding: 0,
        marginTop: 24,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
        borderBottomColor: colors.light.platinumGray,
      },
      pinnedContainer: {
        backgroundColor: colors.light.platinumGray,
      },
      nameLabel: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
        borderBottomColor: colors.dark.volcanicSand,
      },
      pinnedContainer: {
        backgroundColor: colors.light.volcanicSand,
      },
      nameLabel: {
        color: colors.light.platinum,
      },
    },
  };
}
