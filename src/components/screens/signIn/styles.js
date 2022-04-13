import { colors, themes } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white
    }
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black
    }
  },
});
