import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    decryptRecoveryPhrase: {
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
});
