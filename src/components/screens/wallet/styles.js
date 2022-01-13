import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
    },
    scrollView: {
      paddingTop: 220
    },
    accountSummary: {
      zIndex: 2,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%'
    }
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.whiteSmoke
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.textInputBg
    }
  }
});
