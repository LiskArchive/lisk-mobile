import { themes, colors, fonts, boxes } from '../../constants/styleGuide';

export default ({ logoSize }) => ({
  common: {
    container: {
      height: '100%',
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      paddingTop: 36,
      paddingBottom: 35,
    },
    footer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    copy: {
      width: 'auto',
    },
    centerAligned: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      overflow: 'hidden',
      width: logoSize,
      height: logoSize,
      borderRadius: 18,
      marginTop: 20,
    },
    logoImage: {
      width: logoSize,
      height: logoSize,
    },
    appTitle: {
      marginTop: 18,
      marginBottom: 6,
    },
    link: {
      marginTop: 10,
    },
    version: {
      fontFamily: fonts.family.context,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    appTitle: {
      color: colors.light.black,
    },
    version: {
      color: colors.light.gray2,
    },
    link: {
      color: colors.light.blue,
    },
    copy: {
      color: colors.light.gray2,
      fontSize: 15,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    appTitle: {
      color: colors.dark.white,
    },
    version: {
      color: colors.dark.gray3,
    },
    link: {
      color: colors.dark.blue,
    },
    copy: {
      color: colors.dark.gray1,
    },
  },
});
