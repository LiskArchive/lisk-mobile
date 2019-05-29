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
      backgroundColor: colors.light.ultramarineBlue,
      borderRadius: 50,
      marginRight: 12,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    BTCContainer: {
      width: 50,
      height: 50,
      backgroundColor: colors.light.BTC,
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
    itemContainer: {
      borderBottomColor: colors.light.mystic,
    },
    itemLabel: {
      color: colors.light.maastrichtBlue,
    },
    description: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.maastrichtBlue,
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
