import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      padding: boxes.boxPadding,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 3,
      paddingRight: 3,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
    },
    selection: {
      marginLeft: 'auto',
    },
    itemLabel: {
      marginLeft: 'auto',
      paddingTop: 12,
      textAlign: 'left',
    },
    LSKContainer: {
      width: 50,
      height: 50,
      backgroundColor: colors.light.blue,
      borderRadius: 50,
      marginRight: 12,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    BTCContainer: {
      width: 50,
      height: 50,
      backgroundColor: colors.light.btc,
      borderRadius: 50,
      marginRight: 12,
      justifyContent: 'center',
      flexDirection: 'column',
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
    description: {
      color: colors.light.gray1,
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
    description: {
      color: colors.dark.gray4,
    },
  },
});
