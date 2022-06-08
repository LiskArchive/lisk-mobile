import { colors, themes, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: boxes.boxPadding,
      justifyContent: 'space-between'
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
