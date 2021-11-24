import { themes, colors } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    homeContainer: {
      paddingTop: 20
    },
    scrollView: {
      top: 0,
    },
    scrollViewContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
    },
    loadingState: {
      marginTop: 180,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    homeContainer: {
      backgroundColor: colors.light.ultramarineBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    homeContainer: {
      backgroundColor: colors.dark.inkBlue,
    },
  },
});
