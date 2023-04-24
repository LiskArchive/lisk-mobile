import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      height: '100%',
    },
    innerContainer: {
      flex: 1,
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    footer: {
      padding: boxes.boxPadding,
    },
    applicationNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    applicationLogoImage: {
      borderRadius: 50,
      width: 24,
      height: 24,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
    },
    addressLabel: {
      fontSize: fonts.size.input,
      fontFamily: fonts.family.context,
      marginBottom: 8,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginBottom: 32,
    },
    avatar: {
      marginRight: 8,
    },
    address: {
      fontSize: fonts.size.small,
      marginRight: 16,
    },
    copyContainer: {
      alignItems: 'center',
      width: '100%',
    },
    modalContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    shareContainer: {
      alignItems: 'center',
      padding: boxes.boxPadding,
      flex: 1,
    },
    shareText: {
      fontSize: fonts.size.small,
      textAlign: 'center',
      marginTop: boxes.boxPadding,
    },
    fieldContainer: {
      marginBottom: 16,
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
      color: colors.light.maastrichtBlue,
    },
    username: {
      color: colors.light.zodiacBlue,
    },
    address: {
      color: colors.light.blueGray,
    },
    shareText: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    innerContainer: {
      backgroundColor: colors.dark.mainBg,
    },
    addressLabel: {
      color: colors.light.platinum,
    },
    username: {
      color: colors.dark.white,
    },
    address: {
      color: colors.dark.white,
    },
    shareText: {
      color: colors.dark.ghost,
    },
  },
});
