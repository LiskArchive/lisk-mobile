import { colors, themes, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      paddingBottom: boxes.boxPadding,
    },
    description: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black,
    },
    description: {
      color: colors.dark.ghost,
    },
  },
});
