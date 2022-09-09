import { colors, themes, boxes, fonts } from 'constants/styleGuide'

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: boxes.boxPadding,
    },
    description: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
      paddingBottom: 10,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black,
    },
  },
})
