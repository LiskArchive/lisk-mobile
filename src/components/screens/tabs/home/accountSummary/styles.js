import { themes, colors, fonts } from '../../../../../constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    imgContainer: {
      width: '100%',
      height: '100%',
      marginTop: 25,
    },
    profileContainer: {
      padding: 20,
      paddingTop: 20,
      marginTop: 10,
    },
    avatarContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    avatar: {
      padding: 10,
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
      backgroundColor: colors.light.white
    },
    invisibleTitle: {
      color: 'transparent',
    },
    blur: {
      position: 'absolute',
      opacity: 0,
      right: 0,
    },
    blurBig: {
      width: 150,
      height: 45,
    },
    blurMedium: {
      width: 116,
      height: 45,
    },
    blurSmall: {
      width: 91,
      height: 45,
    },
    visibleBlur: {
      opacity: 1,
    },
    title: {
      color: colors.dark.white,
    },
    copyContainer: {
      marginTop: 5,
      marginBottom: 5,
      height: 20,
    },
    label: {
      color: colors.dark.white,
      marginRight: 5,
      lineHeight: 20
    },
    iconStyle: {
      marginLeft: 5,
      paddingTop: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    keyValueRow: {
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.2)',
      marginTop: 10,
      paddingTop: 10,
    },
    tokenLogo: {
      textAlign: 'center',
    },
    blurWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 45,
    },
    lockedBalance: {
      fontSize: fonts.size.h3
    },
  },
  [themes.light]: {
    homeBalance: {
      color: colors.light.white,
    },
    fiatValue: {
      color: colors.light.whiteSmoke,
    },
  },
  [themes.dark]: {
    homeBalance: {
      color: colors.dark.white,
    },
    fiatValue: {
      color: colors.light.whiteSmoke,
    },
  },
});
