import { colors, themes, boxes } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flex: 1,
    },
    title: {
      textAlign: 'center',
      marginBottom: 16,
    },
    footer: {
      paddingTop: boxes.boxPadding,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.dark.white,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
    },
    title: {
      color: colors.dark.white,
    },
  },
};
