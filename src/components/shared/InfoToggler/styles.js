import { themes, colors, fonts } from 'constants/styleGuide'

export default function getInfoTogglerStyles() {
  return {
    common: {
      modalContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
      },
      title: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.h3,
        textAlign: 'center',
        marginBottom: 8,
      },
      descriptionText: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
        marginBottom: 16,
        width: 320,
      },
    },
    [themes.light]: {
      title: {
        color: colors.light.zodiacBlue,
      },
      descriptionText: {
        color: colors.light.slateGray,
      },
    },
    [themes.dark]: {
      title: {
        color: colors.light.white,
      },
      descriptionText: {
        color: colors.light.slateGray,
      },
    },
  }
}
