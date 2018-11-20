import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      padding: 20,
    },
    subHeader: {
      marginTop: 8,
      marginBottom: 16,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 2,
      paddingRight: 2,
      borderBottomWidth: 1,
    },
    itemSymbol: {
    },
    itemLabel: {
      paddingLeft: 8,
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
    subHeader: {
      color: colors.light.gray2,
    },
    itemContainer: {
      borderBottomColor: colors.light.gray5,
    },
    itemSymbol: {
      color: colors.light.black,
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
    subHeader: {
      color: colors.dark.gray1,
    },
    itemContainer: {
      borderBottomColor: colors.dark.gray5,
    },
    itemSymbol: {
      color: colors.dark.white,
    },
    itemLabel: {
      color: colors.dark.white,
    },
    itemSelection: {
      color: colors.dark.white,
    },
  },
});
