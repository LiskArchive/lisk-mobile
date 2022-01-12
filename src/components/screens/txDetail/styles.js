import { themes, colors, fonts } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
      paddingTop: 20,
    },
    addressContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    transactionTitle: {
      fontFamily: fonts.family.contextSemiBold,
      fontSize: 16,
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
      fontSize: 14,
    },
    value: {
      alignItems: 'center',
      fontFamily: fonts.family.context,
      fontWeight: 'bold',
      marginRight: 10,
    },
    referenceValue: {
      flexWrap: 'wrap',
      paddingRight: 30,
    },
    detailRow: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
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
      transform: [{ rotateY: '180deg' }],
    },
    senderAndRecipient: {
      marginBottom: 10,
      paddingBottom: 20,
      flexDirection: 'column',
      borderBottomWidth: 1,
    },
    row: {
      marginBottom: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    pendingIcon: {
      height: 18,
      width: 18,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    date: {
      color: colors.light.slateGray,
    },
    transactionTitle: {
      color: colors.dark.zodiacBlue,
    },
    value: {
      color: colors.light.black,
    },
    senderAndRecipient: {
      borderBottomColor: colors.light.mystic,
      borderTopColor: colors.light.mystic,
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
      borderBottomColor: colors.light.mystic,
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
    dot: {
      backgroundColor: setColorOpacity(colors.light.black, 0.2),
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    date: {
      color: colors.dark.slateGray,
    },
    transactionTitle: {
      color: colors.dark.white,
    },
    value: {
      color: colors.dark.white,
    },
    senderAndRecipient: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.24),
      borderTopColor: setColorOpacity(colors.light.white, 0.24),
    },
    label: {
      color: colors.dark.ghost,
    },
    incoming: {
      color: colors.dark.ufoGreen,
    },
    outgoing: {
      color: colors.dark.white,
    },
    detailRow: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
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
    dot: {
      backgroundColor: colors.dark.ghost,
    },
  },
});
