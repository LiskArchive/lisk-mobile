import { colors, fonts } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 20,
    },
    itemContainer: {
      width: '100%',
      height: 90,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: colors.light.white,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      borderBottomColor: colors.light.gray5,
      borderBottomWidth: 1,
    },
    title: {
      marginBottom: 15,
    },
    nativeList: {
      marginTop: 0,
      borderTopWidth: 0,
    },
    amountWrapper: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    amount: {
      paddingTop: 4,
      width: '100%',
      textAlign: 'right',
    },
    date: {
      color: colors.light.gray1,
    },
    address: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    avatar: {
      paddingRight: 15,
    },
    incoming: {
      color: colors.light.green,
    },
    emptyState: {
      width: '100%',
      display: 'flex',
      flex: 1,
      backgroundColor: colors.light.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noActivity: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    empty: {
      width: 222,
      height: 109,
    },
    loading: {
      width: 237,
      height: 220,
    },
    noTxTitle: {
      paddingTop: 10,
      color: colors.light.gray2,
    },
    pendingIcon: {
      width: 18,
      height: 18,
    },
    initContainer: {
      flexDirection: 'row',
      paddingBottom: 22,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.gray5,
    },
    initText: {
      marginLeft: 7,
    },
    link: {
      fontSize: fonts.size.small,
      color: colors.light.blue,
    },
    footer: {
      height: 90,
      width: '100%',
    },
    image: {
      width: 50,
      height: 50,
    },
  },
});
