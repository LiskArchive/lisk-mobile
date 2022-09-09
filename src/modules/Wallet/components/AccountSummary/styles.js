import { themes, colors, fonts } from 'constants/styleGuide'

export default () => ({
  common: {
    container: {
      padding: 20,
    },
    addressContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      paddingBottom: 15,
      marginBottom: 15,
    },
    label: {
      fontSize: 20,
      marginBottom: 5,
    },
    copy: {
      fontSize: fonts.size.base,
      lineHeight: 18,
    },
    icon: {
      marginTop: 3,
      marginLeft: 5,
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    avatarContainer: {
      elevation: 4,
      alignItems: 'center',
      paddingBottom: 12,
      width: '100%',
    },
    walletBalance: {
      fontSize: 20,
      fontFamily: fonts.family.heading,
    },
    button: {
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 2,
      borderRadius: 5,
      marginTop: 20,
    },
    sendIcon: {
      marginRight: 10,
      marginLeft: -10,
    },
    actionBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      width: '100%',
      paddingTop: 11,
      paddingHorizontal: 12,
    },
    sendButton: {
      marginHorizontal: 12,
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: colors.light.slateGray,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 0,
      borderRadius: 25,
    },
  },
  [themes.light]: {
    walletAddress: {
      color: colors.light.slateGray,
    },
    walletBalance: {
      color: colors.light.black,
    },
    sendButton: {
      backgroundColor: colors.light.white,
      borderColor: colors.light.ghost,
    },
    copy: {
      color: colors.light.blueGray,
    },
    addressContainer: {
      borderBottomColor: colors.light.platinumGray,
    },
    button: {
      borderColor: colors.light.platinumGray,
    },
    send: {
      color: colors.light.zodiacBlue,
    },
    label: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    walletAddress: {
      color: colors.dark.slateGray,
    },
    walletBalance: {
      color: colors.dark.white,
    },
    sendButton: {
      backgroundColor: colors.dark.navigationBg,
    },
    copy: {
      color: colors.dark.mountainMist,
    },
    addressContainer: {
      borderBottomColor: '#4D4D50',
    },
    button: {
      borderColor: '#4D4D50',
    },
    send: {
      color: colors.dark.white,
    },
    label: {
      color: colors.light.white,
    },
  },
})
