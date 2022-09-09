import { themes, colors, boxes, fonts } from 'constants/styleGuide'

export default function getErrorScreenStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        padding: boxes.boxPadding,
        marginVertical: boxes.boxPadding,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        marginBottom: 16,
      },
      title: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.h3,
        padding: 5,
        textAlign: 'center',
      },
      description: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
        textAlign: 'center',
        padding: 8,
        marginBottom: 0,
      },
      continueButton: {
        paddingHorizontal: 24,
      },
    },

    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.dark.ghost,
      },
      description: {
        color: colors.dark.ghost,
      },
    },
  }
}
