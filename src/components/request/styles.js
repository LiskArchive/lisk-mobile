import { themes, colors, boxes, fonts } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {},
    container: {
      height: '100%',
    },
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
    },
    subHeader: {
      flexDirection: 'column',
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    addressLabel: {
      fontSize: fonts.size.small,
      marginBottom: 8,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    address: {
      fontSize: fonts.size.base,
      marginLeft: 10,
      marginRight: 4,
    },
    body: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    shareContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    shareContent: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    shareTextContainer: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    shareText: {
      fontSize: fonts.size.small,
    },
    inputContainer: {
      height: 100,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    innerContainer: {
      backgroundColor: colors.light.white,
    },
    addressLabel: {
      color: colors.light.slateGray,
    },
    address: {
      color: colors.light.maastrichtBlue,
    },
    shareText: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    innerContainer: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    addressLabel: {
      color: colors.light.platinum,
    },
    address: {
      color: colors.dark.white,
    },
    shareText: {
      color: colors.dark.gray4,
    },
  },
});
