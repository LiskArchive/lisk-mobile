import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 16,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 3,
      paddingRight: 3,
      borderBottomWidth: 1,
    },
    itemSelection: {
      marginLeft: 'auto',
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    itemContainer: {
      borderBottomColor: colors.light.gray5,
    },
    itemLabel: {
      color: colors.light.black,
    },
    itemSelection: {
      color: colors.light.black,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: colors.dark.gray5,
    },
    itemLabel: {
      color: colors.dark.white,
    },
    itemSelection: {
      color: colors.dark.white,
    },
  },
});
