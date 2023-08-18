import { themes, colors, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    packageName: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
      flex: 1,
    },
    appLogo: {
      height: 35,
      width: 35,
      borderRadius: 20,
      marginRight: 10,
    },
  },

  [themes.light]: {
    packageName: {
      color: colors.light.maastrichtBlue,
    },
  },

  [themes.dark]: {
    packageName: {
      color: colors.dark.platinum,
    },
  },
});
