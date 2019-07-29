import { themes, colors } from '../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../utilities/helpers';

export default () => ({
  common: {
    walletContainer: {
      overflow: 'hidden',
    },
    avatarContainer: {
      elevation: 4,
      alignItems: 'center',
      paddingBottom: 12,
      width: '100%',
    },
    tokenLogoWrapper: {
      borderRadius: 30,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.light.whiteSmoke,
    },
    walletTokenLogoWrapper: {
      backgroundColor: colors.light.BTC,
    },
    tokenLogo: {
      textAlign: 'center',
    },
    address: {
      width: '100%',
      textAlign: 'center',
      zIndex: 2,
    },
    addressP: {
      lineHeight: 25,
    },
    addressContainer: {
      justifyContent: 'center',
    },
    balance: {
      height: 32,
      width: '100%',
      alignItems: 'center',
      zIndex: 2,
      elevation: 2,
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
    walletContainer: {
      backgroundColor: colors.light.whiteSmoke,
      borderBottomColor: colors.light.whiteSmoke,
      borderBottomWidth: 1,
    },
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
  },
  [themes.dark]: {
    walletContainer: {
      borderBottomWidth: 1,
      backgroundColor: colors.dark.maastrichtBlue,
      borderBottomColor: setColorOpacity(colors.light.white, 0.24),
      borderTopColor: setColorOpacity(colors.light.white, 0.24),
    },
    walletAddress: {
      color: colors.dark.slateGray,
    },
    walletBalance: {
      color: colors.dark.white,
    },
    sendButton: {
      backgroundColor: colors.dark.navigationBg,
    },
  },
});
