import { themes, colors, fonts } from '../../constants/styleGuide';
import { setColorOpacity } from '../../utilities/helpers';

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
    detailRow: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      paddingBottom: 16,
      paddingTop: 16,
      borderBottomWidth: 1,
      marginLeft: 20,
      marginRight: 20,
    },
    rowIconWrapper: {
      width: 36,
    },
    rowIcon: {
      marginRight: 11,
    },
    rowContent: {
      flex: 1,
    },
    label: {
      fontSize: 13,
      marginBottom: 4.5,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 18,
    },
    avatar: {
      paddingBottom: 0,
      marginRight: 20,
    },
    arrow: {
      marginRight: 20,
      marginLeft: 20,
      width: 17,
      height: 11,
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
    amountBlur: {
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'row',
    },
    empty: {
      height: '100%',
      marginTop: 0,
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    explorerLink: {
      fontWeight: 'bold',
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
    outgoingSymbol: {
      backgroundColor: setColorOpacity(colors.light.black, 0.15),
    },
    incomingSymbol: {
      backgroundColor: setColorOpacity(colors.light.ufoGreen, 0.15),
    },
    explorerLink: {
      color: colors.light.ultramarineBlue,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    date: {
      color: colors.dark.slateGray,
    },
    value: {
      color: colors.dark.white,
    },
    senderAndRecipient: {
      backgroundColor: colors.dark.navigationBg,
      borderBottomColor: colors.dark.gray5,
      borderTopColor: colors.dark.gray5,
    },
    label: {
      color: colors.dark.gray4,
    },
    incoming: {
      color: colors.dark.ufoGreen,
    },
    outgoing: {
      color: colors.dark.white,
    },
    detailRow: {
      borderBottomColor: '#373E4F',
    },
    outgoingSymbol: {
      backgroundColor: setColorOpacity(colors.light.white, 0.15),
    },
    incomingSymbol: {
      backgroundColor: setColorOpacity(colors.light.ufoGreen, 0.15),
    },
    explorerLink: {
      color: colors.light.ultramarineBlue,
    },
  },
});
