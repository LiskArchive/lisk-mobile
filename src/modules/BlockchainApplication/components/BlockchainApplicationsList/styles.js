import {
  themes, colors, boxes, fonts
} from 'constants/styleGuide';

export default function getBlockchainApplicationsListStyles() {
  return {
    common: {
      container: {
        flexDirection: 'column',
        flex: 1,
      },
      listContainer: {
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
        marginTop: 32,
      },
      searchIcon: {
        position: 'absolute',
        zIndex: 1,
        left: 30,
      },
      input: {
        flexWrap: 'wrap',
        paddingLeft: 36,
        paddingBottom: 8,
        paddingTop: 8,
        fontFamily: fonts.family.context,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      inputContainer: {
        marginTop: -20,
        position: 'relative',
      },
      statsModal: {
        height: 500,
        zIndex: 2,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
      statsModalCloseButton: {
        position: 'absolute',
        right: 12,
        top: 24,
        zIndex: 1,
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
