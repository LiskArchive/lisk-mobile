import { themes, colors, boxes, fonts } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      height: '100%',
    },
    innerContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    subHeader: {
      flexDirection: 'column',
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      paddingBottom: 40,
    },
    addressLabel: {
      fontSize: fonts.size.small,
      marginBottom: 8,
    },
    addressContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      marginRight: 10,
    },
    address: {
      fontSize: fonts.size.base,
      marginRight: 6,
      maxWidth: '90%',
    },
    copyContainer: {
      alignItems: 'center',
      width: '100%',
    },
    copyIcon: {
      color: colors.light.blueGray,
    },
    body: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: boxes.boxPadding,
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
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    innerContainer: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    addressLabel: {
      color: colors.light.platinum,
    },
    address: {
      color: colors.dark.white,
    },
    shareText: {
      color: colors.dark.ghost,
    },
  },
});
