import { fonts, themes, colors } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      width: '100%',
      overflow: 'hidden',
    },
    iOSxhomeContainer: {
      height: 60,
      marginTop: 30,
    },
    iOShomeContainer: {
      height: 64,
      marginTop: 0,
    },
    androidhomeContainer: {
      height: 56,
      marginTop: 0,
    },
    walletContainer: {
      height: 44,
      marginTop: 0,
    },
    extendedWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
    },
    homeExtended: {
      marginTop: -33,
    },
    walletExtended: {
      marginTop: -29,
    },
    iOSxhomeSimple: {
      marginTop: 20,
    },
    iOShomeSimple: {
      marginTop: 25,
    },
    androidhomeSimple: {
      marginTop: 14,
    },
    walletSimple: {
      marginTop: 6,
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: fonts.family.heading,
      lineHeight: 30,
      height: 30,
    },
    avatar: {
      marginRight: 12,
    },
    blurBig: {
      width: 100,
      height: 30,
      marginLeft: -15,
    },
    blurMedium: {
      width: 77,
      height: 30,
      marginLeft: -10,
    },
    blurSmall: {
      width: 60,
      height: 30,
      marginLeft: -5,
    },
    tokenLogoWrapper: {
      padding: 6,
      borderRadius: 15,
      width: 30,
      height: 30,
      marginRight: 5,
      backgroundColor: colors.light.white,
    },
    walletTokenLogoWrapper: {
      backgroundColor: colors.light.BTC,
    },
    tokenLogo: {
      textAlign: 'center',
    },
  },
  [themes.light]: {
    homeMain: {
      color: colors.light.white,
    },
    walletMain: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    homeMain: {
      color: colors.light.white,
    },
    walletMain: {
      color: colors.light.white,
    },
  },
});
