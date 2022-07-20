import { themes, colors, boxes, fonts } from 'constants/styleGuide'

export default function getBlockchainApplicationsListStyles() {
  return {
    common: {
      wrapper: {
        height: '100%',
      },
      innerContainer: {
        flexDirection: 'column',
        flex: 1,
      },
      body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: boxes.boxPadding,
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
        flex: 1,
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
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
        marginTop: boxes.boxPadding,
        marginBottom: boxes.boxPadding,
      },
      searchIcon: {
        marginRight: 4,
      },
      input: {
        flexWrap: 'wrap',
        paddingLeft: 8,
        paddingBottom: 8,
        paddingTop: 8,
        paddingRight: 8,
        fontFamily: fonts.family.context,
      },
      inputContainer: {
        marginTop: -20,
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      innerContainer: {
        backgroundColor: colors.light.white,
      },
      applicationNameLabel: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      innerContainer: {
        backgroundColor: colors.dark.mainBg,
      },
      applicationNameLabel: {
        color: colors.light.platinum,
      },
    },
  }
}
