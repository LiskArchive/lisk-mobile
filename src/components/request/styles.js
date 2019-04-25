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
      margin: boxes.boxPadding,
      marginBottom: 0,
    },
    main: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    addressLabel: {
      fontSize: fonts.size.base,
      marginBottom: 8,
    },
    address: {
      marginBottom: 24,
      fontSize: fonts.size.small,
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
    subHeader: {
      color: colors.light.gray2,
    },
    addressLabel: {
      color: colors.light.gray1,
    },
    address: {
      color: colors.light.black,
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
    subHeader: {
      color: colors.dark.gray4,
    },
    addressLabel: {
      color: colors.dark.gray1,
    },
    address: {
      color: colors.dark.white,
    },
    shareText: {
      color: colors.dark.gray4,
    },
  },
});
