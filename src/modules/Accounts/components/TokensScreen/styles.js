import { colors, themes, boxes } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flex: 1,
    },
    tokenListContainer: {
      padding: boxes.boxPadding,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
  },
};
