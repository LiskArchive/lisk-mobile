import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getDeleteBlockchainApplicationStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        justifyContent: 'center',
        flex: 1,
      },
      title: {
        textAlign: 'center',
      },
      descriptionText: {
        textAlign: 'center',
        fontSize: fonts.size.base,
      },
      applicationNameContainer: {
        alignItems: 'center',
        marginBottom: 16,
      },
      applicationLogoImage: {
        borderRadius: 50,
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
        marginTop: 16,
        marginBottom: 8,
      },
      applicationNameLabel: {
        fontSize: fonts.size.h3,
        maxWidth: '90%',
        fontWeight: '600',
      },
      submitButton: {
        marginTop: boxes.boxPadding,
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
  };
}
