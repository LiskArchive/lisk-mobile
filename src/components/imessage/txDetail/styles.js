import { themes, colors, fonts } from '../../../constants/styleGuide';

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
      fontWeight: 'bold',
    },
    referenceValue: {
      flexWrap: 'wrap',
      paddingRight: 30,
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
      marginBottom: 10,
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'column',
      alignItems: 'center',
      borderBottomWidth: 1,
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
    amountBlur: {
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'row',
    },
    link: {
      textAlign: 'center',
      marginTop: 20,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    date: {
      color: colors.light.slateGray,
    },
    value: {
      color: colors.light.black,
    },
    senderAndRecipient: {
      backgroundColor: colors.light.navigationBg,
      borderBottomColor: colors.light.gray5,
      borderTopColor: colors.light.gray5,
    },
    label: {
      color: colors.light.slateGray,
    },
    incoming: {
      color: colors.light.ufoGreen,
    },
    outgoing: {
      color: colors.light.black,
    },
    detailRow: {
      borderBottomColor: colors.light.gray5,
    },
    link: {
      color: colors.light.ultramarineBlue,
    },
  },
});
