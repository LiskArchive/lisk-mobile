import {
  themes, colors, fonts
} from 'constants/styleGuide';

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
        borderBottomColor: colors.light.platinumGray,
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
      deleteDefaultApplicationModal: {
        backgroundColor: colors.light.white,
        height: 280,
        zIndex: 3,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      applicationNameLabel: {
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
    },
  };
}
