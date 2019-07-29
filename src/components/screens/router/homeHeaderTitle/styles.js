import { fonts, themes, colors } from '../../../../constants/styleGuide';

import { deviceType } from '../../../../utilities/device';

export default () => ({
  common: {
    container: {
      height: 30,
      width: '100%',
      marginTop: deviceType() === 'iOSx' ? -10 : -5,
    },
    wrapper: {
      marginTop: -30,
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
    },
    main: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: fonts.family.heading,
      lineHeight: 30,
      height: 30,
      margin: 0,
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
