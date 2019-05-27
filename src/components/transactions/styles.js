import { themes, colors, fonts } from '../../constants/styleGuide';
import { viewportHeight } from '../../utilities/device';

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
    },
    itemContainer: {
      width: '100%',
      height: 90,
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      borderBottomWidth: 1,
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    placeholder: {
      height: 180,
      width: '100%',
      justifyContent: 'flex-end',
      paddingBottom: 25,
    },
    title: {
      marginBottom: 8,
    },
    nativeList: {
      marginTop: 0,
      borderTopWidth: 0,
    },
    amountWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    amount: {
      paddingTop: 4,
      width: '100%',
      textAlign: 'right',
      justifyContent: 'flex-end',
    },
    address: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    avatarContainer: {
      paddingRight: 15,
      justifyContent: 'center',
    },
    avatar: {
      borderWidth: 1,
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingState: {
      width: '100%',
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateActivityIndicator: {
      position: 'absolute',
      top: 0,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: viewportHeight() - 170,
      marginTop: 170,
    },
    noActivity: {
      width: '100%',
      alignItems: 'center',
    },
    empty: {
      width: 260,
      height: 129,
    },
    loading: {
      width: 237,
      height: 220,
    },
    noTxTitle: {
      paddingTop: 12,
    },
    pendingIcon: {
      width: 18,
      height: 18,
    },
    initContainer: {
      flexDirection: 'row',
      paddingBottom: 22,
      borderBottomWidth: 1,
    },
    initText: {
      marginLeft: 7,
    },
    link: {
      fontSize: fonts.size.small,
    },
    footer: {
      height: 90,
      width: '100%',
    },
    image: {
      width: 50,
      height: 50,
    },
    incoming: {
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 3,
      borderRadius: 2,
      overflow: 'hidden',
    },
    blurMedium: {
      width: 89,
      height: 45,
      marginTop: -10,
      marginRight: -10,
    },
    blurSmall: {
      width: 72,
      height: 45,
      marginTop: -10,
      marginRight: -10,
    },
  },
  [themes.light]: {
    itemContainer: {
      borderBottomColor: colors.light.gray5,
    },
    emptyState: {
      backgroundColor: colors.light.white,
    },
    address: {
      color: colors.light.black,
    },
    date: {
      color: colors.light.gray1,
    },
    avatar: {
      borderColor: colors.light.white,
    },
    outgoing: {
      color: colors.light.black,
    },
    incoming: {
      color: colors.light.green,
      backgroundColor: colors.light.incomingBg,
    },
    outgoingSymbol: {
      backgroundColor: colors.light.sendBalanceBg,
    },
    incomingSymbol: {
      backgroundColor: colors.light.incomingBg,
    },
    noTxTitle: {
      color: colors.light.gray2,
    },
    initContainer: {
      borderBottomColor: colors.light.gray5,
    },
    initText: {
      color: colors.light.black,
    },
    link: {
      color: colors.light.blue,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: colors.dark.gray5,
    },
    emptyState: {
      backgroundColor: colors.dark.gray5,
    },
    address: {
      color: colors.dark.white,
    },
    date: {
      color: colors.dark.gray4,
    },
    avatar: {
      borderColor: colors.dark.gray5,
    },
    outgoing: {
      color: colors.dark.white,
    },
    incoming: {
      color: colors.dark.green,
      backgroundColor: colors.dark.incomingBg,
    },
    outgoingSymbol: {
      backgroundColor: colors.dark.sendBalanceBg,
    },
    incomingSymbol: {
      backgroundColor: colors.dark.incomingBg,
    },
    noTxTitle: {
      color: colors.dark.gray2,
    },
    initContainer: {
      borderBottomColor: colors.dark.gray5,
    },
    initText: {
      color: colors.dark.white,
    },
    link: {
      color: colors.dark.blue,
    },
  },
});
