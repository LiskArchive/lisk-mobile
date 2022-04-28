import { themes, colors } from 'constants/styleGuide';
import { deviceHeight } from 'utilities/device';

export default () => ({
  common: {
    container: {
      flex: 1
    },
    flex: {
      flex: 1,
      zIndex: 10
    },
    emptyContainer: {
      marginTop: 0,
      minHeight: deviceHeight() - 400,
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center'
    },
    scrollView: {
      paddingTop: 220
    },
    titleContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: -30
    },
    accountSummary: {
      zIndex: 2,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%'
    },
    fixedBottom: {
      bottom: 0,
      position: 'absolute',
      height: 60,
      right: 0,
      left: 0
    }
  },
  [themes.light]: {
    titleContainer: {
      backgroundColor: colors.light.white
    },
    title: {
      color: colors.light.black
    },
    container: {
      backgroundColor: colors.light.whiteSmoke
    },
    fixedBottom: {
      backgroundColor: colors.light.white
    },
    emptyContainer: {
      backgroundColor: colors.light.white
    },
  },
  [themes.dark]: {
    titleContainer: {
      backgroundColor: colors.dark.black
    },
    container: {
      backgroundColor: colors.dark.textInputBg
    },
    title: {
      color: colors.dark.white
    },
    fixedBottom: {
      backgroundColor: colors.dark.black
    },
    emptyContainer: {
      backgroundColor: colors.dark.mainBg
    },
  }
});
