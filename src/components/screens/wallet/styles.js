import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      backgroundColor: colors.light.white,
    },
    scrollView: {
      paddingTop: 220,
    },
    accountSummary: {
      zIndex: 2,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
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
