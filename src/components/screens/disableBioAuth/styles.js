import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      backgroundColor: colors.light.white,
    },
    container: {
      flex: 1,
      padding: boxes.boxPadding,
    },
    passphraseContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
  },
});
