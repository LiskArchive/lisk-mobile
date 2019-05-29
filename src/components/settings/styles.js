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
    itemNoBorder: {
      borderBottomColor: 'transparent',
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
      color: colors.light.maastrichtBlue,
    },
    item: {
      borderBottomColor: colors.light.mystic,
    },
    targetStateLabel: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    subHeader: {
      color: colors.dark.white,
    },
    item: {
      borderBottomColor: colors.dark.gray5,
    },
    targetStateLabel: {
      color: colors.dark.slateGray,
    },
  },
});
