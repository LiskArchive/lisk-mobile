import { themes, colors } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    accountSummary: {
      zIndex: 2,
      // position: 'absolute',
      left: 0,
      top: 0,
      // width: '100%',
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
