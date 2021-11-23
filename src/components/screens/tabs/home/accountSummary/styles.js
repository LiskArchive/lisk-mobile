import { themes, colors } from '../../../../../constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
      minHeight: 290,
    },
    profileContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      padding: 20,
      paddingTop: 90,
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
      marginTop: 10,
      marginBottom: 5,
    },
    label: {
      color: colors.dark.white,
      marginRight: 10,
    },
    iconStyle: {
      marginLeft: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    keyValueRow: {
      borderTopWidth: 0.2,
      borderTopColor: colors.dark.whiteSmoke,
      marginTop: 10,
      paddingTop: 10,
      minHeight: 30,
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
