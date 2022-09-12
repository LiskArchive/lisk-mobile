import { themes, colors, fonts, boxes } from 'constants/styleGuide';

export default ({ logoSize }) => ({
  common: {
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: boxes.boxPadding,
      paddingTop: 50,
    },
    logo: {
      overflow: 'hidden',
      width: logoSize,
      height: logoSize,
      borderRadius: 18,
    },
    logoImage: {
      width: logoSize,
      height: logoSize,
    },
    appTitle: {
      marginTop: 6,
      marginBottom: 18,
    },
    version: {
      fontFamily: fonts.family.context,
    },
    link: {
      marginTop: 10,
      fontFamily: fonts.family.contextBold,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    appTitle: {
      color: colors.light.maastrichtBlue,
    },
    version: {
      color: colors.light.slateGray,
    },
    link: {
      color: colors.light.ultramarineBlue,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    appTitle: {
      color: colors.dark.white,
    },
    version: {
      color: colors.dark.slateGray,
    },
    link: {
      color: colors.dark.ultramarineBlue,
    },
  },
});
