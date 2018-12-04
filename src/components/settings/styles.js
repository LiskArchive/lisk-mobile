import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    innerContainer: {
      padding: boxes.boxPadding,
    },
    group: {
      marginBottom: 20,
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
    subHeader: {
      color: colors.dark.white,
    },
    item: {
      borderBottomColor: colors.dark.gray5,
    },
  },
});
