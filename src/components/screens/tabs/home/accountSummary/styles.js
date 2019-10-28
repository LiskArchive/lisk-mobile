import { themes, colors } from '../../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../../utilities/helpers';

export default () => ({
  common: {
    container: {
      width: '100%',
      overflow: 'hidden',
    },
    homeContainer: {
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
    tokenLogoWrapperDetails: {
      borderRadius: 30,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.light.BTC,
    },
    tokenLogo: {
      textAlign: 'center',
    },
    balance: {
      height: 32,
      width: '100%',
      alignItems: 'center',
      zIndex: 2,
      elevation: 2,
    },
    blurWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 45,
    },
    blur: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: -18,
      zIndex: 2,
      opacity: 0,
    },
    visibleBlur: {
      opacity: 1,
    },
    invisibleTitle: {
      color: 'transparent',
    },
    blurBig: {
      width: 150,
      height: 45,
      marginLeft: -75,
    },
    blurMedium: {
      width: 116,
      height: 45,
      marginLeft: -58,
    },
    blurSmall: {
      width: 91,
      height: 45,
      marginLeft: -45,
    },
    fiat: {
      width: '100%',
      alignItems: 'center',
      zIndex: 2,
    },
    fiatValue: {},
    bookmarkButton: {
      marginHorizontal: 8,
      minWidth: 45,
      height: 45,
      borderWidth: 1,
      borderColor: colors.light.slateGray,
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 0,
      borderRadius: 2,
    },
    bookmarkButtonTitle: {
      color: colors.light.slateGray,
    },
    paginationWrapper: {
      position: 'absolute',
      width: '100%',
      left: 0,
      bottom: 17,
    },
    pagination: {
      backgroundColor: 'transparent',
      paddingVertical: 0,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colors.light.white,
      backgroundColor: colors.light.white,
      marginHorizontal: -4,
    },
    inactiveDot: {
      borderColor: colors.light.white,
      backgroundColor: 'transparent',
    },
  },
  [themes.light]: {
    homeContainerLSK: {
      backgroundColor: colors.light.ultramarineBlue,
    },
    homeContainerBTC: {
      backgroundColor: colors.light.BTC,
    },
    homeBalance: {
      color: colors.light.white,
    },
    fiatValue: {
      color: colors.light.whiteSmoke,
    },
  },
  [themes.dark]: {
    homeContainerLSK: {
      backgroundColor: setColorOpacity(colors.dark.homeHeaderBg),
    },
    homeContainerBTC: {
      backgroundColor: setColorOpacity(colors.dark.homeHeaderBg),
    },
    homeBalance: {
      color: colors.dark.white,
    },
    fiatValue: {
      color: colors.light.whiteSmoke,
    },
  },
});
