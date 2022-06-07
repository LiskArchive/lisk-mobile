import { themes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    container: {
      flex: 1,
      marginTop: -15,
      marginBottom: -5,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 3,
      paddingRight: 3,
      justifyContent: 'space-between',
    },
    borderBottom: {
      borderBottomWidth: 1,
    },
    selection: {
      marginLeft: 'auto',
    },
    itemLabel: {
      marginLeft: 'auto',
      textAlign: 'left',
      width: '100%',
    },
    balance: {
      marginTop: 7,
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
    icon: {
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
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
      borderBottomColor: colors.light.mystic,
    },
    itemLabel: {
      color: colors.light.black,
    },
    balance: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    header: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: setColorOpacity(colors.dark.white, 0.24),
    },
    itemLabel: {
      color: colors.dark.white,
    },
    balance: {
      color: colors.dark.ghost,
    },
  },
});
