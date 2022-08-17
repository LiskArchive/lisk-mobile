import { themes, colors } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flex: 1,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    username: {
      color: colors.light.zodiacBlue,
    },
    address: {
      color: colors.light.silverGrey,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    username: {
      color: colors.dark.ghost,
    },
    address: {
      color: colors.light.whiteSmoke,
    },
  },
};
