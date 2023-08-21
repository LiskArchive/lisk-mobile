import { themes, colors, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    row: {
      alignItems: 'center',
      marginBottom: 20,
    },
    packageName: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
      textAlign: 'center',
    },
    description: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
      textAlign: 'center',
    },
    appLogo: {
      height: 40,
      width: 40,
      borderRadius: 20,
      marginBottom: 10,
    },
    buttonContainer: {
      borderWidth: 0,
    },
  },

  [themes.light]: {
    text: {
      color: colors.light.maastrichtBlue,
    },
  },

  [themes.dark]: {
    text: {
      color: colors.dark.platinum,
    },
  },
});
