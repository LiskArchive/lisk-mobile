import { themes, colors } from 'constants/styleGuide';
import { deviceHeight } from 'utilities/device';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 20,
      flex: 1,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      minHeight: deviceHeight() - 400,
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
      padding: 20,
    },
    noActivity: {
      width: '100%',
      alignItems: 'center',
    },
    loading: {
      width: 237,
      height: 220,
    },
    pendingIcon: {
      width: 18,
      height: 18,
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
    container: {
      backgroundColor: colors.light.white,
    },
    itemContainer: {
      borderBottomColor: colors.light.mystic,
    },
    address: {
      color: colors.light.black,
    },
    date: {
      color: colors.light.slateGray,
    },
    avatar: {
      borderColor: colors.light.ghost,
    },
    incomingAmount: {
      color: colors.light.ufoGreen,
    },
    outgoingAmount: {
      color: colors.light.black,
    },
    incoming: {
      backgroundColor: setColorOpacity(colors.light.ufoGreen, 0.15),
    },
    outgoingSymbol: {
      backgroundColor: setColorOpacity(colors.dark.black, 0.15),
    },
    incomingSymbol: {
      backgroundColor: setColorOpacity(colors.light.ufoGreen, 0.15),
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
    },
    title: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.24),
    },
    address: {
      color: colors.dark.white,
    },
    date: {
      color: colors.dark.ghost,
    },
    avatar: {
      borderColor: colors.dark.ghost,
    },
    incomingAmount: {
      color: colors.dark.ufoGreen,
    },
    outgoingAmount: {
      color: colors.dark.white,
    },
    incoming: {
      backgroundColor: setColorOpacity(colors.dark.ufoGreen, 0.15),
    },
    outgoingSymbol: {
      backgroundColor: setColorOpacity(colors.dark.white, 0.15),
    },
    incomingSymbol: {
      backgroundColor: setColorOpacity(colors.light.ufoGreen, 0.15),
    },
  },
});
