import { themes, colors, fonts, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: boxes.boxPadding,
      paddingTop: 50,
    },
    isotypeContainer: {
      padding: 16,
      borderRadius: 18,
      backgroundColor: colors.light.ultramarineBlue,
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
