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
      fontSize: fonts.size.input,
      marginTop: 8,
      marginBottom: 16,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white,
    },
    description: {
      color: colors.light.smoothGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black,
    },
    description: {
      color: colors.dark.mountainMist,
    },
  },
});
