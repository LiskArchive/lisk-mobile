import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    innerContainer: {
      padding: 20,
      paddingTop: 36,
      paddingBottom: 60,
    },
    group: {
      marginTop: 20,
    },
    subHeader: {
      marginBottom: 8,
    },
    item: {
      borderBottomWidth: 1,
      paddingTop: 14,
      paddingBottom: 14,
      minHeight: 36,
    },
    signOut: {
      marginBottom: 40,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    subHeader: {
      color: colors.light.black,
    },
    item: {
      borderBottomColor: colors.light.gray5,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    subHeader: {
      color: colors.dark.white,
    },
    item: {
      borderBottomColor: colors.dark.gray5,
    },
  },
});
