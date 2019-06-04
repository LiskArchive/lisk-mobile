import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      alignContent: 'space-around',
    },
    scrollView: {
      marginTop: -10,
    },
    accountSummary: {
      zIndex: 2,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
    },
    loadingState: {
      marginTop: 180,
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
