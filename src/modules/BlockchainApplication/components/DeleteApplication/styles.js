import { themes, colors, boxes, fonts } from 'constants/styleGuide'

export default function getDeleteBlockchainApplicationStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
        paddingTop: 44,
      },
      innerContainer: {
        justifyContent: 'center',
        flex: 1,
      },
      title: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 32,
      },
      descriptionText: {
        textAlign: 'center',
        fontSize: fonts.size.base,
      },
      applicationNameContainer: {
        alignItems: 'center',
        marginBottom: 24,
      },
      applicationLogoImage: {
        borderRadius: 50,
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
        marginBottom: 16,
      },
      applicationNameLabel: {
        fontSize: fonts.size.h3,
        maxWidth: '90%',
        fontWeight: '600',
      },
      submitButton: {
        marginBottom: boxes.boxPadding,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      applicationNameLabel: {
        color: colors.light.zodiacBlue,
      },
      descriptionText: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.dark.white,
      },
      applicationNameLabel: {
        color: colors.dark.white,
      },
      descriptionText: {
        color: colors.dark.white,
      },
    },
  }
}
