import { themes, colors, fonts } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

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
      transform: [{ rotateY: '180deg' }],
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
    votesRow: {
      flexWrap: 'wrap',
    },
    voteNumberContainer: {
      borderRadius: 4,
      marginRight: 8,
      fontSize: fonts.size.small,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    votesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      borderRadius: 3,
      padding: 5,
      marginRight: 8,
      marginVertical: 2.5,
    },
    voteNumber: {
      fontSize: fonts.size.small,
    },
    vote: {
      fontSize: fonts.size.small,
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
    value: {
      color: colors.light.black,
    },
    senderAndRecipient: {
      backgroundColor: colors.light.whiteSmoke,
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
    votesContainer: {
      borderColor: setColorOpacity(colors.light.black, 0.2),
    },
    voteNumberContainer: {
      backgroundColor: colors.light.slateGray,
    },
    voteNumber: {
      color: colors.light.white,
    },
    dot: {
      backgroundColor: setColorOpacity(colors.light.black, 0.2),
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
      backgroundColor: colors.dark.maastrichtBlue,
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
    votesContainer: {
      borderColor: colors.dark.blueGray,
    },
    voteNumberContainer: {
      backgroundColor: colors.dark.blueGray,
    },
    voteNumber: {
      color: colors.dark.white,
    },
    vote: {
      color: colors.dark.white,
    },
    dot: {
      backgroundColor: colors.dark.ghost,
    },
  },
});
