import { themes, colors, fonts } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 20,
    },
    divider: {
      margin: 20,
      marginBottom: 0,
    },
    title: {
      paddingTop: 35,
      paddingLeft: 20,
      paddingRight: 20,
    },
    address: {
      fontSize: 24,
      paddingBottom: 15,
    },
    date: {
      alignItems: 'center',
      fontFamily: fonts.family.context,
      marginTop: 5,
    },
    value: {
      alignItems: 'center',
      fontFamily: fonts.family.context,
    },
    label: {
      fontSize: 13,
      marginBottom: 7,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      paddingBottom: 0,
      marginRight: 20,
    },
    arrow: {
      marginRight: 20,
      marginLeft: 20,
      width: 99,
      height: 16,
    },
    reverseArrow: {
      transform: [
        { rotateY: '180deg' },
      ],
    },
    senderAndRecipient: {
      marginTop: 24,
      marginBottom: 10,
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'column',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    row: {
      marginBottom: 14,
      flexDirection: 'row',
      alignItems: 'center',
    },
    incoming: {},
    outgoing: {},
    shareIcon: {
      marginLeft: 10,
    },
    transactionId: {
      marginBottom: 0,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 16,
      paddingTop: 16,
      borderBottomWidth: 1,
      marginLeft: 20,
      marginRight: 20,
    },
    rowIcon: {
      marginRight: 11,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    title: {
      color: colors.light.black,
    },
    date: {
      color: colors.light.gray2,
    },
    value: {
      color: colors.light.black,
    },
    senderAndRecipient: {
      backgroundColor: '#F8FCFF',
      borderBottomColor: colors.light.gray5,
      borderTopColor: colors.light.gray5,
    },
    label: {
      color: colors.light.gray1,
    },
    incoming: {
      color: colors.light.green,
    },
    outgoing: {
      color: colors.light.black,
    },
    detailRow: {
      borderBottomColor: colors.light.gray5,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    title: {
      color: colors.dark.white,
    },
    date: {
      color: colors.dark.gray2,
    },
    value: {
      color: colors.dark.white,
    },
    senderAndRecipient: {
      backgroundColor: colors.dark.tabBarBgNavy,
      borderBottomColor: colors.dark.gray5,
      borderTopColor: colors.dark.gray5,
    },
    label: {
      color: colors.dark.gray4,
    },
    incoming: {
      color: colors.dark.green,
    },
    outgoing: {
      color: colors.dark.white,
    },
    detailRow: {
      borderBottomColor: '#373E4F',
    },
  },
});
